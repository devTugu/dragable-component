"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import Navigation from "@/components/section/Navigation";
import LeagueItem from "@/components/section/LeagueItem";

// Define the shape of a league
interface League {
  id: string;
  logo: string;
  name: string;
  espnId: string;
  year: string;
  status: string;
}

// Initial list of leagues
const initialLeagues: League[] = [
  {
    id: "1",
    logo: "/league-1.png",
    name: "St. Louis Pro Season Points League",
    espnId: "ESPN",
    year: "2023",
    status: "Draft Live",
  },
  {
    id: "2",
    logo: "/league-2.png",
    name: "Washington Pro Season Points League",
    espnId: "ESPN",
    year: "2023",
    status: "Pre-Draft",
  },
  {
    id: "3",
    logo: "/league-3.png",
    name: "New York Pro H2H Points PPR League",
    espnId: "ESPN",
    year: "2023",
    status: "Draft Live",
  },
  {
    id: "4",
    logo: "/league-2.png",
    name: "Washington Pro Season Points League",
    espnId: "ESPN",
    year: "2023",
    status: "Draft Live",
  },
  {
    id: "5",
    logo: "/league-3.png",
    name: "New York Pro H2H Points PPR League",
    espnId: "ESPN",
    year: "2023",
    status: "Post-Draft",
  },
];

// Props for droppable containers
interface DroppableProps {
  children: React.ReactNode;
}

// Droppable area for active leagues
function DroppableLeagues({ children }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "leagues-container",
  });

  return (
    <div
      ref={setNodeRef}
      className={`${isOver ? "bg-zinc-800" : ""} rounded-md transition-colors`}
    >
      {children}
    </div>
  );
}

// Props for archived section
interface DroppableArchiveProps extends DroppableProps {
  archivedLeagues: League[];
}

// Droppable area for archived leagues
function DroppableArchive({
  children,
  archivedLeagues,
}: DroppableArchiveProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "archived-section",
  });

  return (
    <div
      ref={setNodeRef}
      className={`mt-4 text-center text-zinc-500 text-sm py-8 border-2 border-dashed ${
        isOver ? "border-zinc-500 bg-zinc-800" : "border-zinc-700"
      } rounded-md transition-colors min-h-[100px]`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [leagues, setLeagues] = useState<League[]>(initialLeagues);
  const [archivedVisible, setArchivedVisible] = useState<boolean>(true);
  const [archivedLeagues, setArchivedLeagues] = useState<League[]>([]);

  // Configure drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle logic when a drag ends
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Move from active to archive
    if (
      over?.id === "archived-section" &&
      leagues.some((league) => league.id === active.id)
    ) {
      const leagueToArchive = leagues.find((l) => l.id === active.id);
      if (leagueToArchive) {
        setLeagues((items) => items.filter((l) => l.id !== active.id));
        setArchivedLeagues((prev) => [
          ...prev,
          { ...leagueToArchive, status: "Archived" },
        ]);
      }
    }
    // Reorder within active leagues
    else if (
      active.id !== over?.id &&
      over?.id &&
      leagues.some((l) => l.id === active.id) &&
      leagues.some((l) => l.id === over.id)
    ) {
      setLeagues((items) => {
        const oldIndex = items.findIndex((l) => l.id === active.id);
        const newIndex = items.findIndex((l) => l.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          const updated = [...items];
          const [moved] = updated.splice(oldIndex, 1);
          updated.splice(newIndex, 0, moved);
          return updated;
        }
        return items;
      });
    }
    // Reorder within archived leagues
    else if (
      active.id !== over?.id &&
      over?.id &&
      archivedLeagues.some((l) => l.id === active.id) &&
      archivedLeagues.some((l) => l.id === over.id)
    ) {
      setArchivedLeagues((items) => {
        const oldIndex = items.findIndex((l) => l.id === active.id);
        const newIndex = items.findIndex((l) => l.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          const updated = [...items];
          const [moved] = updated.splice(oldIndex, 1);
          updated.splice(newIndex, 0, moved);
          return updated;
        }
        return items;
      });
    }
  }

  // Unarchive a league
  function handleUnarchive(league: League) {
    setArchivedLeagues((items) =>
      items.filter((item) => item.id !== league.id)
    );
    setLeagues((items) => [...items, { ...league, status: "Post-Draft" }]);
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={16} height={16} />
            <h1 className="text-lg">Leagues</h1>
          </div>
          <Button
            variant="default"
            size="sm"
            className="text-xs text-white bg-zinc-800"
          >
            + Create League
          </Button>
        </div>

        {/* Drag-and-drop context for leagues */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {/* Active leagues section */}
          <DroppableLeagues>
            <SortableContext
              items={leagues.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              {leagues.map((league) => (
                <LeagueItem key={league.id} league={league} />
              ))}
            </SortableContext>
          </DroppableLeagues>

          {/* Archived section toggle */}
          <div className="mt-8">
            <div
              className="flex items-center text-zinc-400 cursor-pointer"
              onClick={() => setArchivedVisible(!archivedVisible)}
            >
              <span className="mr-2">
                {archivedVisible ? <ChevronDown /> : <ChevronRight />}
              </span>
              <span>Archived</span>
            </div>

            {/* Archived leagues list */}
            {archivedVisible && (
              <DroppableArchive archivedLeagues={archivedLeagues}>
                {archivedLeagues.length > 0 ? (
                  <SortableContext
                    items={archivedLeagues.map((l) => l.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {archivedLeagues.map((league) => (
                      <LeagueItem key={league.id} league={league} />
                    ))}
                  </SortableContext>
                ) : (
                  <div className="py-4">Drag leagues here to archive</div>
                )}
              </DroppableArchive>
            )}
          </div>
        </DndContext>

        {/* Footer navigation */}
        <Navigation />
      </div>
    </div>
  );
}
