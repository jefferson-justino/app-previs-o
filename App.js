import { useEffect, useState } from "react"
import { View, Text, SafeAreaView, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native"

export default function Home() {
  const [city, setCity] = useState('Rio largo')
  const [locais, setLocais] = useState([])
const key = '34cd467b'

const url = 'https://api.hgbrasil.com/weather?key='+key+'&city_name='+city

  const [week, setWeek] = useState([])
  const api = async () => {
    const result = await fetch(url)
    const formatResult = await result.json()
    setLocais(formatResult)
    setWeek(locais.results.forecast)
  }
  useEffect(() => {
   
    api()
  }, [])


  
  return (

    <View style={styles.container}>
      <TextInput placeholder='Digite uma cidade' onChangeText={setCity} style={styles.input} />
      <TouchableOpacity onPress={()=>api()} style={styles.bot}>
        <Text style={styles.text}>VER PREVISÃO</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.text}>{locais.results.city}</Text>
        <Text style={styles.text}>{locais.results.temp}°C</Text>
        <Text style={styles.text}>{locais.results.description}</Text>
        <Text style={styles.text}>Humidade: {locais.results.humidity}%</Text>
      </View>
      <FlatList data={week} renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.text}>{item.weekday}</Text>
          <Text style={styles.text}>Max: {item.max}°C | Min: {item.min}°C</Text>
          <Text style={styles.text}>{item.description}</Text>
        </View>
      )} />

    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '2%',
    flex: 1,
  },
  card: {
    alignItems: 'center',
    marginTop: '5%',
    backgroundColor: 'gray',
    borderRadius: 15,
    padding: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  input:{
    borderWidth:1, 
    padding:5,
    borderRadius:10
  },
  bot:{
    marginTop:2,
    backgroundColor:'gray',
    padding:10,
    borderRadius:15,
    alignItems:'center'
  }

});
