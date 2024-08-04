const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    agencyName: { type: String },
    agencyDetails: { type: mongoose.Schema.Types.Mixed },
    occupation: { type: String },
    previousRent: { type: String },
    resetToken: { type: String,  sparse: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    agencyId: { type: String, unique: true, sparse: true },
    agency: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' }
  });

  const agencySchema = new Schema({
    agencyName: String,
    logo: String,
    officeAddress: String,
    userId: { type: String, unique: true, sparse: true, ref: 'User' }, // Changed to String
    phone: String,
    properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
    formSubmissions: [{ type: Schema.Types.ObjectId, ref: 'FormSubmission' }],
  }, { timestamps: true });
  

  const propertySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    agencyId: { type: Schema.Types.ObjectId, ref: 'Agency' },
    price: { type: String, required: true },
    location: { type: String, required: true },
    applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }]
  }, { timestamps: true });


const templateSchema = new Schema({
  name: { type: String, required: true },
  fields: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  formSubmissions: [{ type: Schema.Types.ObjectId, ref: 'FormSubmission' }],
}, { timestamps: true });

const formSubmissionSchema = new Schema({
  agencyId: { type: Schema.Types.ObjectId, ref: 'Agency' },
  templateId: { type: Schema.Types.ObjectId, ref: 'Template' },
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property' },
  data: Schema.Types.Mixed,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  references: [{ type: Schema.Types.ObjectId, ref: 'Reference' }],
}, { timestamps: true });

const referenceSchema = new Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  contactInfo: String,
  relationship: String,
  isConfirmed: { type: Boolean, default: false },
  additionalDetails: String,
  identityDocument: String,
  formSubmissionId: { type: Schema.Types.ObjectId, unique: true, sparse: true, ref: 'FormSubmission' },
}, { timestamps: true });

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  personalInfo: {
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], required: true },
    nationality: { type: String, default: 'Nigerian' },
    stateOfOrigin: { type: String, required: true },
    lga: { type: String, required: true },
  },
  contactInfo: {
    phoneNumber: { type: String, required: true },
    alternatePhoneNumber: { type: String },
    email: { type: String, required: true },
    currentAddress: { type: String, required: true },
  },
  identificationInfo: {
    idType: { type: String, enum: ['National ID', 'Voters Card', 'Drivers License', 'International Passport'], required: true },
    idNumber: { type: String, required: true },
    bvn: { type: String, required: true },
    nin: { type: String },
  },
  employmentInfo: {
    occupation: { type: String, required: true },
    employerName: { type: String },
    employerAddress: { type: String },
    monthlyIncome: { type: Number, required: true },
  },
  propertyPreferences: {
    desiredLocation: { type: String, required: true },
    propertyType: { type: String, enum: ['Flat', 'Duplex', 'Bungalow', 'Self-Contain', 'Shared Apartment'], required: true },
    maxRent: { type: Number, required: true },
    preferredMoveInDate: { type: Date },
  },
  guarantorInfo: {
    fullName: { type: String, required: true },
    relationship: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    occupation: { type: String, required: true },
  },
  additionalInfo: {
    hasPets: { type: Boolean, default: false },
    smoker: { type: Boolean, default: false },
    previousEvictions: { type: Boolean, default: false },
    criminalRecord: { type: Boolean, default: false },
  },
  documents: {
    passportPhoto: { type: String },
    proofOfIncome: { type: String },
    idCardScan: { type: String },
  },
  applicationStatus: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  payments: [{
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    reference: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Agency = mongoose.model('Agency', agencySchema);
const Property = mongoose.model('Property', propertySchema);
const Template = mongoose.model('Template', templateSchema);
const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);
const Reference = mongoose.model('Reference', referenceSchema);
const Application = mongoose.model('Application', applicationSchema);


module.exports = {
  User,
  Agency,
  Property,
  Template,
  FormSubmission,
  Reference,
  Application
};
