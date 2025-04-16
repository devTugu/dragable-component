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
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import Navigation from "@/components/section/Navigation";
import LeagueItem from "@/components/section/LeagueItem";
// League data
const initialLeagues = [
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

// Create a DroppableArchive component
// Create a component for the droppable leagues container
function DroppableLeagues({ children }) {
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

// Create a component for the droppable archive
function DroppableArchive({ children, archivedLeagues }) {
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
  const [leagues, setLeagues] = useState(initialLeagues);
  const [archivedVisible, setArchivedVisible] = useState(true); // Set to true by default for easier testing
  const [archivedLeagues, setArchivedLeagues] = useState([]);

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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Check if dragging from active leagues to archived section
    if (
      over?.id === "archived-section" &&
      leagues.some((league) => league.id === active.id)
    ) {
      // Find the league to archive
      const leagueToArchive = leagues.find((item) => item.id === active.id);

      if (leagueToArchive) {
        // First remove from active leagues to prevent duplicates
        setLeagues((items) => items.filter((item) => item.id !== active.id));

        // Then add to archived leagues with updated status
        setArchivedLeagues((prev) => [
          ...prev,
          { ...leagueToArchive, status: "Archived" },
        ]);
      }
    }
    // Normal reordering within active leagues
    else if (
      active.id !== over?.id &&
      over?.id &&
      leagues.some((league) => league.id === active.id) &&
      leagues.some((league) => league.id === over?.id)
    ) {
      setLeagues((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newItems = [...items];
          const [removed] = newItems.splice(oldIndex, 1);
          newItems.splice(newIndex, 0, removed);
          return newItems;
        }
        return items;
      });
    }
    // Normal reordering within archived leagues
    else if (
      active.id !== over?.id &&
      over?.id &&
      archivedLeagues.some((league) => league.id === active.id) &&
      archivedLeagues.some((league) => league.id === over.id)
    ) {
      setArchivedLeagues((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newItems = [...items];
          const [removed] = newItems.splice(oldIndex, 1);
          newItems.splice(newIndex, 0, removed);
          return newItems;
        }
        return items;
      });
    }
  }

  // Function to handle unarchiving a league
  function handleUnarchive(league) {
    // First remove from archived leagues
    setArchivedLeagues((items) =>
      items.filter((item) => item.id !== league.id)
    );

    // Then add back to active leagues with updated status
    setLeagues((items) => [...items, { ...league, status: "Post-Draft" }]);
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-2xl mx-auto p-6">
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
            <span>+ Create League</span>
          </Button>
        </div>

        {/* Main leagues list */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {/* Create a droppable area for the main league section */}
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

          {/* Archived section */}
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

            {archivedVisible && (
              <DroppableArchive archivedLeagues={archivedLeagues}>
                {archivedLeagues.length > 0 ? (
                  <SortableContext
                    items={archivedLeagues.map((l) => l.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {archivedLeagues.map((league) => (
                      <LeagueItem
                        key={league.id}
                        league={league}
                        onUnarchive={handleUnarchive}
                      />
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
