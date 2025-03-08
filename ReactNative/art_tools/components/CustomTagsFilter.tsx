import { View, Text,Modal,TouchableOpacity,StyleSheet,Button, Pressable, FlatList } from 'react-native'
import React, { SetStateAction, useEffect } from 'react'

import {useState} from 'react';

interface CustomTagsFilterProps{
    visible:boolean,
    onClose: () => void,
    tagselect: React.Dispatch<SetStateAction<string>>,
    data: ArtToolProps[]
  
}

export const CustomTagsFilter = ({ visible, onClose,tagselect,data }:CustomTagsFilterProps) => {
    const [tag,setTag] = useState<ArtToolProps[]>([]) 
 
      
       useEffect(()=>{
        const removeDuplicatesByName = (dataArray: ArtToolProps[]) => {
          const uniqueMap = new Map();  
          dataArray.forEach(item => {
            // Ensure the item has a name property before using it as a key
            if (item) {
              uniqueMap.set(item.brand, item);
            }
          });
          setTag(Array.from(uniqueMap.values()))
        };
        removeDuplicatesByName(data)
       },[data])
  
  return (
      <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Filter By Brand</Text>
    
          {/* Filter Tags List */}
          <View style={styles.filterOptions}>
            <FlatList
              data={tag}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable 
                  style={styles.tag} 
                  onPress={() => { tagselect(item.brand); onClose(); }}
                >
                  <Text key={item.id} style={styles.tagText}>{item.brand}</Text>
                </Pressable>
              )}
            />
          </View>
    
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.modalButton, styles.closeButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
            <Pressable 
              style={[styles.modalButton, styles.clearButton]} 
              onPress={() => { onClose(); tagselect(""); }}
            >
              <Text style={styles.buttonText}>Clear Filter</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
    
    );
  };

  const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  filterOptions: {
    width: "100%",
    maxHeight: 200, // Prevents overflow
    paddingVertical: 10,
  },
  tag: {
    backgroundColor: "rgb(139, 160, 255)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  tagText: {
    color: "white",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "red",
  },
  clearButton: {
    backgroundColor: "rgb(139, 160, 255)",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
