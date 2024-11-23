import { Modal, Rating } from '@common';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { reviewApi } from '../review.api';

const ToastSuccess = () => (
  <div className="flex items-center gap-2">
    <svg
      xmlns="http://www.w3
      .org/2000/svg"
      className="icon icon-check"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
    >
      <path stroke-linecap="round" strokelinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Feedback sent successfully</span>
  </div>
);



export default function ReviewModal({ action = "create", id = "", order, refresh = () => { } }) {
  const {
    useGetReviewMutation,
    useUpdateReviewMutation,
    useCreateReviewMutation,
    useDeleteReviewMutation,
  } = reviewApi;

  const reviewValues = useRef({
    title: "",
    description: "",
    rating: 0,
    isAnonymous: false,
  });
  const [review, setReview] = useState({});
  const [error, setError] = useState(null)
  const [_action, setAction] = useState(action)

  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [getReview] = useGetReviewMutation();


  const fetchReview = useCallback(async () => {
    return await getReview(id).unwrap().then((data) => {
      setReview(data.resource);
    });
  }, [getReview, id]);

  const handleCreateReview = useCallback(async () => {
    let payload = {
      id,
      review: {
        ...review,
        order: order.id,
      }
    }
    console.log(payload.review)
    return await createReview(payload.review).unwrap().then((data) => {
      if (data?.error) {
        setError(data.error.data.message)
        return toast.error(data.error.data.message)
      }
      setError(null)
      setReview(data.resource)
      refresh({
        ...order,
        review: data.resource
      })
      toast.success(<ToastSuccess />);
    }).catch(e => {
      console.error(e)
    });
  }, [createReview, review]);

  const handleUpdateReview = useCallback(async () => {
    let payload = {
      id,
      review: {
        ...review,
        order: order.id,
      }
    }
    return await updateReview(payload).unwrap().then((data) => {
      if (data?.error) {
        setError(data.error.data.message)
        return toast.error(data.error.data.message)
      }
      setError(null)
      setReview(data.resource)
      refresh({
        ...order,
        review: data.resource
      })
      toast.success(<ToastSuccess />);
    }).catch(e => {
      console.error(e)
    });
  }, [updateReview, id, review]);

  const handleDeleteReview = useCallback(async () => {
    return await deleteReview(id).unwrap().then(() => {
      if (data?.error) {
        setError(data.error.data.message)
        return toast.error(data.error.data.message)
      }
      setReview(null)
      setError(null)
      toast.success(<ToastSuccess />);
    }).catch((e) => {
      toast.error("Error deleting feedback.")
    });
  }, [deleteReview, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRateChange = (rating) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating,
    }));
  };

  const handleSubmit = async () => {
    if (_action === "create") {
      await handleCreateReview();
    } else if (_action === "edit") {
      await handleUpdateReview();
    }
  };

  useEffect(() => {
    if (review) setAction('edit');
  }, [review]);
  useEffect(() => {
    if (_action === "edit" && order?.review?.id) {
      setReview(order.review);
    };
  }, [_action]);
  return (review?.id || _action == 'create') && (
    <Modal
      parentClass="z-[1100]"
      buttonClass="btn btn-info btn-outline w-full"
      buttonLabel={_action === "create" ? "Send Feedback" : "Edit Feedback"}
      title="Send Feedback"
    >
      <div className="flex flex-col gap-2">
        <div className="w-full flex flex-col items-center justify-center mb-4 gap-4">
          <h1 className="text-lg font-bold">Rate your experience</h1>
          <Rating withRating={false} value={review.rating} onChange={handleRateChange} />
        </div>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Title"
          name="title"
          value={review.title}
          onChange={handleChange}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Your feedback here"
          name="description"
          value={review.description}
          onChange={handleChange}
        ></textarea>
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          {_action === "create" ? "Send" : "Update"}
        </button>

        {_action === "edit" && (
          <button className="btn btn-error w-full" onClick={handleDeleteReview}>
            Delete
          </button>
        )}

        {/* Send as Anonymous */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAnonymous"
            className="toggle"
            checked={review.isAnonymous}
            onChange={handleChange}
          />
          <label htmlFor="isAnonymous">Send as anonymous</label>
        </div>
        <p className="text-xs italic font-light">
          By sending feedback, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
        {
          error && (
            <p className="text-xs italic text-red-400 my-4">
              *Error while performing an action: {error}
            </p>
          )
        }
      </div>
    </Modal>
  );
}