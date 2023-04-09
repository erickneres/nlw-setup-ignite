import { View, TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface CheckBoxProps extends TouchableOpacityProps {
  title: string,
  checked?: boolean,
}

export function CheckBox({ title, checked = false, ...rest }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center" 
      {...rest}
    >
      {checked ? (
        <Animated.View 
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center" 
          entering={ZoomIn} 
          exiting={ZoomOut}
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      )}

      <Text className="text-white ml-3 font-semibold">
        {title}
      </Text>

    </TouchableOpacity>
  )
}