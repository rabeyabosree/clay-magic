import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../../redux/reducers/productsSlice';

const AddReview = ({ productId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview({ id: productId, review: { user: 'Anonymous', comment, rating } }));
    setComment('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a review..."
        required
      />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Stars
          </option>
        ))}
      </select>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReview;
