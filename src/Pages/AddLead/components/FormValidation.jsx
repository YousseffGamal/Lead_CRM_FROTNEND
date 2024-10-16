import React from "react";

const FormValidation = ({ formData, isBidding }) => {
  const errors = {};

  // Validation logic
  if (!formData.firstName) {
    errors.firstName = "firstName is required.";
  }
  if (!formData.lastName) {
    errors.lastName = "lastName is required.";
  }
  if (!formData.askingPrice) {
    errors.askingPrice = "askingPrice is required.";
  }
  if (!formData.email) {
    errors.email = "email is required.";
  }
  if (!formData.phone) {
    errors.phone = "phone is required.";
  }
  if (!formData.addressLine) {
    errors.addressLine = "addressLine is required.";
  }
  if (!formData.city) {
    errors.city = "city is required.";
  }
  if (!formData.state) {
    errors.state = "state is required.";
  }
  if (!formData.zip) {
    errors.zip = "zip is required.";
  }
  if (!formData.county) {
    errors.county = "county is required.";
  }
  if (!formData.bedCount) {
    errors.bedCount = "bedCount is required.";
  }
  if (!formData.bathCount) {
    errors.bathCount = "embathCountail is required.";
  }
  if (!formData.sqft) {
    errors.sqft = "sqft is required.";
  }
  if (!formData.occupancy) {
    errors.occupancy = "occupancy is required.";
  }
  if (!formData.leadType) {
    errors.leadType = "leadType is required.";
  }
  if (!formData.closingTime) {
    errors.closingTime = "closingTime is required.";
  }
  if (!formData.bestTimeForCallback) {
    errors.bestTimeForCallback = "bestTimeForCallback is required.";
  }
  if (!formData.motivation) {
    errors.motivation = "motivation is required.";
  }
  if (!formData.zillowLink) {
    errors.zillowLink = "zillowLink is required.";
  }
  if (!formData.zillowEstimate) {
    errors.zillowEstimate = "zillowEstimate is required.";
  }
  if (!formData.additionalNotes) {
    errors.additionalNotes = "additionalNotes is required.";
  }
  if (!formData.condition) {
    errors.condition = "condition is required.";
  }

  if (isBidding === true) {
    if (!formData.biddingStartingDate) {
      errors.biddingStartingDate = "biddingStartingDate is required.";
    }
    if (!formData.duration) {
      errors.duration = "duration is required.";
    }
    if (!formData.biddingIncreasePercentage) {
      errors.biddingIncreasePercentage =
        "biddingIncreasePercentage is required.";
    }
    if (!formData.intialBiddingPrice) {
      errors.intialBiddingPrice = "intialBiddingPrice is required.";
    }
  } else {
    if (!formData.LeadPrice) {
      errors.LeadPrice = "LeadPrice is required.";
    }
  }

  return errors; // Return errors object
};

export default FormValidation;
