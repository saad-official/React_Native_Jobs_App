import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import useFetch from '../../../hook/useFetch'
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const { data, isLoading, error, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  // {!data && refetch()}

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
  }
  // console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : ( error ? (
            <Text>Something went wrong</Text>
          ) : (
              <FlatList data={data}
                renderItem={({ item }) => (
              <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={() => handleCardPress(item)} />
                )}
                keyExtractor={(item) => item.job_id} 
                contentContainerStyle={{ columnGap: SIZES.medium }}
                horizontal
              />
        ))}
      </View>
    
    </View>
  )
}

export default Popularjobs