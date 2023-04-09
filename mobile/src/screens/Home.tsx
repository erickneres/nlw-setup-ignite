import { useCallback, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import { api } from "../lib/axios";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

import { generateDateFromYearBeginning } from "../utils/generate-date-from-year-beginning";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateDateFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

type Summary = {
  id: string,
  date: string,
  amount: number,
  completed: number,
}

export function Home() {
  const [summary, setSummary] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);

      const response = await api.get("summary");
      setSummary(response.data);

    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos");

      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []));

  if(loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text 
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center m-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View 
          className="flex-row flex-wrap"
        >
          {datesFromYearStart.map(date => {
            const dayWithHabits = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day');
            });
            
            return (
              <HabitDay 
                key={date.toISOString()} 
                date={date}
                amountOfHabits={dayWithHabits?.amount}
                amountCompleted={dayWithHabits?.completed}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
            )
          })}

          {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <View
              key={i}
              className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
              style={{ width: DAY_SIZE, height: DAY_SIZE }} 
            >
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}