// dialgog in Available time Tab

import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import { EventInput } from "@/interfaces/types";
import { RRule } from "rrule";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface AvailabilityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: {
    title: string;
    description: string;
    // location: string;
    isBackgroundEvent: boolean;
    date?: string;
    startTime: string;
    endTime: string;
    recurrence?: {
      daysOfWeek: number[];
      startTime: string;
      endTime: string;
      startRecur: string;
      endRecur: string;
    };
  }) => void;
  event?: Omit<EventInput, "fee"> | null;
  isLoading?: boolean;
}

// const presetLocations = [
//   { value: "Kraken 1", label: "Kraken 1" },
//   { value: "Kraken 2", label: "Kraken 2" },
//   { value: "Kraken 3", label: "Kraken 3" },
//   { value: "location4", label: "Location 4" },
//   { value: "location5", label: "Location 5" },
// ];

// Those bellow values are initialize like this to prevent the safari bug for not inputing date and time values.

const today = new Date();
const formattedDate = today.toLocaleDateString("en-CA"); // YYYY-MM-DD format

const startTimeToday = new Date(today.setHours(8, 0, 0, 0))
  .toLocaleTimeString("en-US", { hour12: false })
  .substring(0, 5); // "08:00"

const endTimeToday = new Date(today.setHours(9, 0, 0, 0))
  .toLocaleTimeString("en-US", { hour12: false })
  .substring(0, 5); // "09:00"

const AvailabilityDialog: React.FC<AvailabilityDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  event,
  isLoading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [location, setLocation] = useState("");
  const [date, setDate] = useState(formattedDate);
  const [isBackgroundEvent, setIsBackgroundEvent] = useState(true);
  const [startTime, setStartTime] = useState(startTimeToday);
  const [endTime, setEndTime] = useState(endTimeToday);
  const [isRecurring, setIsRecurring] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);
  const [startRecur, setStartRecur] = useState(formattedDate);
  const [endRecur, setEndRecur] = useState(formattedDate);
  const [open, setOpen] = useState(false);
  // const [filteredLocations, setFilteredLocations] = useState(presetLocations);

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      // setLocation(event.location || "");
      setIsBackgroundEvent(event.isBackgroundEvent || false);
      setDate(
        event.startDate
          ? event.startDate.toLocaleDateString("en-CA") // Formats date as YYYY-MM-DD in local time
          : ""
      );
      setStartTime(
        event.start
          ? event.start
              .toLocaleTimeString("en-US", { hour12: false })
              .substring(0, 5)
          : ""
      );
      setEndTime(
        event.end
          ? event.end
              .toLocaleTimeString("en-US", { hour12: false })
              .substring(0, 5)
          : ""
      );
      if (event.recurrence) {
        setIsRecurring(true);
        setDaysOfWeek(event.recurrence.daysOfWeek || []);
        setStartRecur(event.recurrence.startRecur || "");
        setEndRecur(event.recurrence.endRecur || "");
      }
    }
  }, [event]);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);

    // If the event is recurring, set the start recurrence date to the selected date
    if (isRecurring) {
      setStartRecur(selectedDate);
    }
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      // location,
      isBackgroundEvent,
      date,
      startTime,
      endTime,
      recurrence: isRecurring
        ? {
            daysOfWeek,
            startTime,
            endTime,
            startRecur,
            endRecur,
          }
        : undefined,
    };

    console.log("Event passed from availability dialog", eventData);
    console.log("date from availability dialog", eventData.date);
    console.log("start time from availability dialog", eventData.startTime);
    console.log("end time from availability dialog", eventData.endTime);
    onSave(eventData);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    // setLocation("");
    setDate(formattedDate);
    setIsBackgroundEvent(true);
    setStartTime(startTimeToday);
    setEndTime(endTimeToday);
    setIsRecurring(false); // Reset to false to avoid unintended recurring events
    setDaysOfWeek([]);
    setStartRecur(formattedDate);
    setEndRecur(formattedDate);
    onClose();
  };

  // const handleLocationSelect = (currentValue: string) => {
  //   setLocation(currentValue);
  //   setOpen(false);
  // };

  // const handleLocationInputChange = (value: string) => {
  //   setLocation(value);

  //   const filtered = presetLocations.filter((loc) =>
  //     loc.label.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFilteredLocations(filtered);
  // };

  // const handleLocationInputKeyPress = (
  //   event: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (event.key === "Enter") {
  //     // When the Enter key is pressed, close the popover and save the input
  //     setOpen(false);
  //   }
  // };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-y-auto max-h-full h-full overflow-x-auto w-11/12 sm:max-w-md sm:max-h-[80vh] sm:h-auto">
        <DialogHeader>
          <DialogTitle>
            {event ? "Edit Availability" : "New Availability"}
          </DialogTitle>
          <DialogDescription>
            {event
              ? "Edit this availability event"
              : "Create a new availability event"}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Title
            </Label>
            <Input
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="text-base input-no-zoom" // Apply custom class
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Notes
            </Label>
            <Input
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              className="text-base input-no-zoom" // Apply custom class
            />
          </div>

          {/* location */}
          {/* <div>
            <Label className="block text-sm font-medium text-gray-700">
              Location
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between text-base input-no-zoom" // Apply custom class
                  onClick={() => setOpen(!open)} // Toggle popover on click
                >
                  {location
                    ? presetLocations.find((loc) => loc.value === location)
                        ?.label || location
                    : "Select location..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0 popover-above-modal">
                <Command>
                  <CommandInput
                    placeholder="Search location..."
                    value={location}
                    onValueChange={handleLocationInputChange}
                    onKeyDown={handleLocationInputKeyPress} // Handle keyboard input
                    className="h-9 text-base input-no-zoom" // Apply custom class
                  />
                  <CommandList>
                    <CommandEmpty>No locations found.</CommandEmpty>
                    <CommandGroup>
                      {filteredLocations.map((loc) => (
                        <CommandItem
                          key={loc.value}
                          value={loc.value}
                          onSelect={() => {
                            handleLocationSelect(loc.value); // Set location
                            setOpen(false); // Close the popover after selection
                          }}
                        >
                          {loc.label}
                          <CheckIcon
                            className={`ml-auto h-4 w-4 ${
                              location === loc.value
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div> */}
          <div className="space-y-2">
            <Label className="block text-sm font-medium text-gray-700">
              Availability Event
            </Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isBackgroundEvent}
                onCheckedChange={(checked) =>
                  setIsBackgroundEvent(checked !== "indeterminate" && checked)
                }
                id="backgroundEventCheckbox"
              />
              <Label
                htmlFor="backgroundEventCheckbox"
                className="text-sm font-medium text-gray-700"
              >
                Is Availability Event
              </Label>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Will show on calendar as background / Available time
            </p>
          </div>

          <div className="space-y-2">
            <Label className="block text-sm font-medium text-gray-700">
              Recurring Event
            </Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isRecurring}
                onCheckedChange={(checked: any) =>
                  setIsRecurring(checked !== "indeterminate" && checked)
                }
                id="recurringEventCheckbox"
              />
              <Label
                htmlFor="recurringEventCheckbox"
                className="text-sm font-medium text-gray-700"
              >
                Is Recurring
              </Label>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Date
            </Label>
            <Input
              aria-autocomplete="none"
              // id="search"
              // name="search"
              // autoComplete="off"
              // placeholder="yyyy-mm-dd"
              type="date"
              value={date}
              onChange={handleDateChange}
              className="text-base input-no-zoom" // Apply custom class
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <Label className="text-sm font-medium text-gray-700">
                Start Time
              </Label>
              <Input
                // id="search"
                // name="search"
                type="time"
                value={startTime}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setStartTime(e.target.value)
                }
                className="w-32 px-2 py-2 text-center rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-base input-no-zoom" // Apply custom class
              />
            </div>
            <div className="flex flex-col">
              <Label className="text-sm font-medium text-gray-700">
                End Time
              </Label>
              <Input
                // id="search"
                // name="search"
                type="time"
                value={endTime}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEndTime(e.target.value)
                }
                className="w-32 px-2 py-2 text-center rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-base input-no-zoom" // Apply custom class
              />
            </div>
          </div>

          {isRecurring && (
            <>
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Days of Week
                </Label>
                <div className="flex space-x-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <div key={day} className="flex flex-col items-center">
                      <Checkbox
                        checked={daysOfWeek.includes(day)}
                        onCheckedChange={(checked: any) =>
                          setDaysOfWeek((prev) =>
                            checked
                              ? [...prev, day]
                              : prev.filter((d) => d !== day)
                          )
                        }
                      />
                      <Label className="mt-1">
                        {["Su", "M", "T", "W", "Th", "F", "Sa"][day]}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col">
                  <Label className="block text-sm font-medium text-gray-700">
                    Start Recurrence
                  </Label>
                  <Input
                    // id="search"
                    // name="search"
                    type="date"
                    value={startRecur}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setStartRecur(e.target.value)
                    }
                    disabled // Disable manual input
                    className="text-base input-no-zoom" // Apply custom class
                  />
                </div>
                <div className="flex flex-col">
                  <Label className="block text-sm font-medium text-gray-700">
                    End Recurrence
                  </Label>
                  <Input
                    // id="search"
                    // name="search"
                    type="date"
                    value={endRecur}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEndRecur(e.target.value)
                    }
                    className="text-base input-no-zoom" // Apply custom class
                  />
                </div>
              </div>
            </>
          )}
        </form>

        <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button variant="rebusPro" onClick={handleSave} disabled={isLoading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityDialog;
