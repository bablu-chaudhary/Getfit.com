import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0]); // Placeholder data for the graph

  useEffect(() => {
    createChannel();
  }, []);

  const addWorkout = () => {
    const newWorkout = { id: Math.random().toString(), name: `Workout ${workouts.length + 1}` };
    setWorkouts([...workouts, newWorkout]);
  };

  const scheduleNotification = () => {
    PushNotification.localNotificationSchedule({
      message: "Time to log your workout!",
      date: new Date(Date.now() + 60 * 1000) // Schedule notification for 1 minute later
    });
  };

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: "get-fit-channel",
      channelName: "Get Fit Notifications",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Get Fit</Text>
      
      <Text style={styles.label}>Steps:</Text>
      <TextInput style={styles.input} keyboardType='numeric' value={steps.toString()} onChangeText={text => setSteps(Number(text))} />
      
      <Text style={styles.label}>Calories Burned:</Text>
      <TextInput style={styles.input} keyboardType='numeric' value={calories.toString()} onChangeText={text => setCalories(Number(text))} />
      
      <Text style={styles.label}>Water Intake (Liters):</Text>
      <TextInput style={styles.input} keyboardType='numeric' value={waterIntake.toString()} onChangeText={text => setWaterIntake(Number(text))} />
      
      <Button title="Add Workout" onPress={addWorkout} />
      <Button title="Schedule Reminder" onPress={scheduleNotification} />
      
      <FlatList 
        data={workouts}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={item => item.id}
      />

      <Text style={styles.chartTitle}>Weekly Progress</Text>
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  chartTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default App;
