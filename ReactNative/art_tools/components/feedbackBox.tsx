import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ReviewSectionProps{
    feedbacks: FeedBackProps[];
}

export default function ReviewSection({feedbacks}:ReviewSectionProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const starMap = [1,2,3,4,5]

  // Filter feedback based on selected rating
  // Also I am counting the X.X float numbers
  const filteredFeedback = selectedRating
    ? feedbacks.filter((feedback) => feedback.rating >= selectedRating 
                                    && Math.floor(feedback.rating) <= selectedRating 
  ): feedbacks; // or display ALL feedback

  // Render star rating 5 STARS Max
  const renderRating = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((value, i) => (
          <FontAwesome
            key={i}
            name= { i < Math.floor(rating) // Full stars
              ? 'star'
              : i < rating // I am counting the Half Star thingy
              ? 'star-half-full'
              : 'star-o' // No stars
              }
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.reviewBox}>
      <Text style={styles.title}>Check The Reviews</Text>
      <View style={styles.filterContainer}>
        {starMap.map((star) => (
          <Pressable
            key={star}
            style={[
              styles.filterButton,
              selectedRating === star ? styles.activeFilter : {},
            ]}
            onPress={() => setSelectedRating(selectedRating === star ? null : star)}
          >
            <Text style={styles.filterText}>{star} ★</Text>
          </Pressable>
        ))}
      </View>
      {filteredFeedback.length > 0 ? (
        filteredFeedback.map((feedback, index) => (
          <View
            key={index}
            style={styles.feedbackItem}
           
          >
            <Text style={styles.feedbackUser}>{feedback.author}</Text>
            {renderRating(feedback.rating)}
            <Text style={styles.feedbackComment}>{feedback.comment}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noFeedbackText}>No reviews found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  reviewBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#FFD700',
  },
  filterText: {
    fontWeight: 'bold',
  },
  feedbackItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  feedbackUser: {
    fontWeight: 'bold',
  },
  feedbackComment: {
    marginTop: 5,
    color: '#555',
  },
  noFeedbackText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
