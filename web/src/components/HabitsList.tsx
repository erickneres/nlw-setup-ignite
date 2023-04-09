import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { Loading } from './Loading';

interface HabitsListProps {
  date: Date,
  onCompletedChanged: (completed: number) => void,
}

interface HabitsInfo {
  possibleHabits: {
    id: string,
    title: string,
    completedAt: string,
  }[],

  completedHabits: string[],
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  const [isLoadingHabitsList, setIsLoadingHabitsList] = useState(true);

  useEffect(() => {
    api.get("day", {
      params: {
        date: date.toISOString(),
      },
    }).then(response => {
      setHabitsInfo(response.data);
      setIsLoadingHabitsList(false);
    })
  }, []);

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    await api.patch(`habits/${habitId}/toggle`);

    const isHabityAlredyCompleted = habitsInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabityAlredyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);

      setHabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits,
      });
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];

      setHabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits,
      });
    }

    onCompletedChanged(completedHabits.length);
  }

  if (isLoadingHabitsList) {
    return (
      <div className="flex justify-center mt-6 w-full text-violet-400">
        <Loading size={30} />
      </div>
    )
  }

  return (
    <div className="mt-6 flex flex-col gap-6">
      {habitsInfo?.possibleHabits.map(habit => (
        <Checkbox.Root
          key={habit.id} 
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <span 
            className={clsx("font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400", {
              "text-zinc-400": isDateInPast
            })}
          >
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  )
}