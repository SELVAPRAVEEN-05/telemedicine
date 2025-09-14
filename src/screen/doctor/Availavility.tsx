import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import {Availavilitystyle as styles } from "../../styles/AvailavilityStyle"

// Utility: number of days in a month
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Utility: first day of the month (0=Sunday, 6=Saturday)
const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

export default function AvailabilityScreen() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<number>(today.getDate());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-11
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: "9:00 AM - 10:00 AM", enabled: false },
    { id: 2, time: "10:00 AM - 11:00 AM", enabled: true },
    { id: 3, time: "11:00 AM - 12:00 PM", enabled: false },
    { id: 4, time: "1:00 PM - 2:00 PM", enabled: true },
    { id: 5, time: "2:00 PM - 3:00 PM", enabled: false },
    { id: 6, time: "3:00 PM - 4:00 PM", enabled: true },
  ]);

  const toggleTimeSlot = (id: number) => {
    setTimeSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === id ? { ...slot, enabled: !slot.enabled } : slot
      )
    );
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
    setSelectedDate(1); // reset selected day
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
    setSelectedDate(1); // reset selected day
  };

  const handleSave = () => {
    const selectedAvailability = {
      date: selectedDate,
      month: currentMonth + 1, // +1 because months are 0-indexed
      year: currentYear,
      slots: timeSlots.filter((slot) => slot.enabled),
    };

    Alert.alert(
      "Availability Saved",
      `Date: ${selectedAvailability.date}-${selectedAvailability.month}-${selectedAvailability.year}\n` +
        `Slots: ${selectedAvailability.slots
          .map((s) => s.time)
          .join(", ") || "No slots selected"}`
    );

    console.log("Saved Availability:", selectedAvailability);
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const startDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const calendarDays = [];

    // Add empty cells before first day
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            selectedDate === day && styles.selectedDay,
          ]}
          onPress={() => setSelectedDate(day)}
        >
          <Text
            style={[
              styles.dayText,
              selectedDate === day && styles.selectedDayText,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.calendarContainer}>
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Text style={styles.navButton}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.navButton}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Weekday headers */}
        <View style={styles.dayHeaderRow}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.dayHeader}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>{calendarDays}</View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Availability</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Calendar */}
        {renderCalendarGrid()}

        {/* Available Times */}
        <View style={styles.timeSlotsSection}>
          <Text style={styles.sectionTitle}>Available Times</Text>

          {timeSlots.map((slot) => (
            <View key={slot.id} style={styles.timeSlotRow}>
              <Text style={styles.timeSlotText}>{slot.time}</Text>
              <Switch
                value={slot.enabled}
                onValueChange={() => toggleTimeSlot(slot.id)}
                trackColor={{ false: "#E5E5E5", true: "#FFB366" }}
                thumbColor={slot.enabled ? "#FF7A00" : "#FFFFFF"}
                ios_backgroundColor="#E5E5E5"
                style={styles.switch}
              />
            </View>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Availability</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


