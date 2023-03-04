import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import Rating from "react-rating";
import { toast } from "react-toastify";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

import Loader from "../components/Loader";
import Pagination from "./Pagination";

import { GET_RESTAURANT_REVIEWS } from "../services/ENDPOINT";

import { dateFormate } from "../common";

const RestaurantReview = () => {
  const [isloader, setLoader] = useState(false);
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [ratingSummary, setRatingSummary] = useState([]);
  const [reviewCountsRating, setReviewCountsRating] = useState([]);
  const paramsId = queryString.parse(location.search).vendorId;
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPageRows: 5,
  });

  const getRestaurantReviews = async (e) => {
    try {
      setLoader(true);
      setRestaurantReviews([]);
      setRatingSummary([]);
      const payload = {
        vendorId: paramsId,
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
      };
      const data = await GET_RESTAURANT_REVIEWS(payload);
      if (data.code === 200 || data.code === "200") {
        setRestaurantReviews(data.data.restaurant_reviews);
        setRatingSummary(data.data.rating_summary[0]);
        setReviewCountsRating(data.data.review_counts_by_rating);
        setPagination(data.data.pagination);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getRestaurantReviews();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    Restaurant Review
                  </h3>
                </div>
                <Link to="/school/organize-event">
                  <Button size="sm" variant="primary" className="px-4">
                    Back
                  </Button>
                </Link>
              </div>
              <div className="row">
                <div className="col-lg-5 col-md-12 col-sm-12">
                  <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center my-3">
                      <div className="d-flex align-items-center">
                        <Rating
                          initialRating={ratingSummary.restaurant_rating}
                          emptySymbol="far fa-star star-reating-size mr-1"
                          fullSymbol="fas fa-star star-reating-size mr-1"
                          className="star-color-yellow"
                          readonly
                        />
                        <h2 className="text-4 mb-0 ml-4">
                          {ratingSummary.restaurant_rating} out of 5
                        </h2>
                      </div>
                      <div>
                        <h2 className="text-4 mb-0">
                          {ratingSummary.no_of_reviews} ratings
                        </h2>
                      </div>
                    </div>
                    {reviewCountsRating.map((item, index) => (
                      <div className="row mt-3" key={index}>
                        <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                          <div className="d-flex">
                            <h2 className="color-dark-blue text-4 mb-0 mr-5">
                              {item.ratindex} Star
                            </h2>
                            <div className="my-0">
                              <Rating
                                initialRating={item.ratindex}
                                emptySymbol="far fa-star fa-1x mr-1"
                                fullSymbol="fas fa-star fa-1x mr-1"
                                className="star-color-yellow"
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                          <h2 className="color-dark-blue text-4 mb-0">
                            {item.no_of_reviews}
                          </h2>
                        </div>
                      </div>
                    ))}
                    <div className="border-bottom-gray my-3"></div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="mt-4 restaurant-border-right pl-lg-4 pl-md-0 pl-sm-0">
                    {restaurantReviews.map((item, index) => (
                      <div className="border-bottom-gray my-3" key={index}>
                        <div className="d-flex align-items-center">
                          <Avatar
                            textSizeRatio={2}
                            size={40}
                            round
                            name={item.feedback_by}
                          />
                          <h2 className="text-4 ml-2 mb-0">
                            {item.feedback_by}
                          </h2>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="my-2">
                              <Rating
                                initialRating={item.rating}
                                emptySymbol="far fa-star fa-1x mr-1"
                                fullSymbol="fas fa-star fa-1x mr-1"
                                fractions={2}
                                className="star-color-yellow"
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h2 className="text-4 mb-0">
                            Reviewed on {dateFormate(item.feedback_date)}
                          </h2>
                          <p className="text-4 color-gray">{item.feedback}</p>
                        </div>
                      </div>
                    ))}
                    {isloader && (
                      <div className="d-flex justify-content-center">
                        <i className="fa fa-spinner fa-pulse fa-4x fa-fw color-admin-theme" />
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-end">
                      {pagination && pagination.totalPages > 0 && (
                        <Pagination
                          pagination={pagination}
                          changePage={getRestaurantReviews}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RestaurantReview;
