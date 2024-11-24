import { Modal, Rating } from '@common';
import { useState } from 'react';

export default function CommentModal() {
  const [values, setValues] = useState({
    title: '',
    comment: '',
    rating: 10,
  });

  const handleRateChange = (rating) => {
    setValues((prevValues) => ({
      ...prevValues,
      rating,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <Modal
      buttonClass="btn btn-info btn-outline w-full"
      buttonLabel="Comment"
      title="Send Feedback"
    >
      <div className="flex flex-col gap-2">
        <div className="w-full flex flex-col items-center justify-center mb-4 gap-4">
          <h1 className="text-lg font-bold">Rate your experience</h1>
          <Rating disabled={false} withRating={false} onChange={handleRateChange} />
        </div>
        {/* Title */}
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        {/* Message */}
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Your feedback here"
          name="comment"
          value={values.comment}
          onChange={handleChange}
        ></textarea>
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </Modal>
  );
}