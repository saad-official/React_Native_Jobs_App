import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { SIZES } from '../../../constants'

import styles from './tabs.style'

const TabsButton = ({name, activeTab, onHandleSearch}) => (
  <TouchableOpacity style={styles.btn(name,activeTab)} onPress={onHandleSearch}>
    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
)


const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabsButton
            name={item}
            activeTab={activeTab}
            onHandleSearch={() => setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={{columnGap:SIZES.small /2}}
      >

      </FlatList>
    </View>
  )
}

export default Tabs