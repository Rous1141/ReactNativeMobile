import { View, Text, Modal, Pressable, FlatList, StyleSheet } from 'react-native';
import React, { SetStateAction, useEffect, useState } from 'react';

interface ArtToolProps {
  id: string;
  brand: string;
}

interface CustomTagsFilterProps {
  visible: boolean;
  onClose: () => void;
  tagselect: React.Dispatch<SetStateAction<string>>;
  data: ArtToolProps[];
}

export const CustomTagsFilter = ({ visible, onClose, tagselect, data }: CustomTagsFilterProps) => {
  const [tag, setTag] = useState<ArtToolProps[]>([]);

  useEffect(() => {
    const removeDuplicatesByName = (dataArray: ArtToolProps[]) => {
      const uniqueMap = new Map();
      dataArray.forEach((item) => {
        if (item) {
          uniqueMap.set(item.brand, item);
        }
      });
      setTag(Array.from(uniqueMap.values()));
    };
    removeDuplicatesByName(data);
  }, [data]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable

      style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Filter By Brand</Text>

          {/* Filter Tags List */}
          <View style={styles.filterOptions}>
            <FlatList
              data={tag}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Pressable
                  style={[
                    styles.tag,
                    { backgroundColor: index % 2 === 0 ? "rgb(100, 149, 237)" : "rgb(70, 130, 180)" }, // Two blue shades
                  ]}
                  onPress={() => {
                    tagselect(item.brand);
                    onClose();
                  }}
                >
                  <Text key={item.id} style={styles.tagText}>{item.brand}</Text>
                </Pressable>
              )}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={[styles.modalButton, styles.closeButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.clearButton]}
              onPress={() => {
                onClose();
                tagselect("");
              }}
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "70%",
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  filterOptions: {
    width: "100%",
    height: "70%",
    paddingVertical: 10,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
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
    backgroundColor: "rgb(100, 149, 237)",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
