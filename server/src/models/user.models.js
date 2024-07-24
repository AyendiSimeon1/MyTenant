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
  address: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  agencyId: { type: Schema.Types.ObjectId, ref: 'Agency' },
  price: { type: String, required: true },
  formSubmissions: [{ type: Schema.Types.ObjectId, ref: 'FormSubmission' }],
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

const applicationSchema = new Schema({
  title: { type: String, required: true },
  logoUrl: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  agentId: { type: Schema.Types.ObjectId, ref: 'User' },
  fields: Schema.Types.Mixed,
  uniqueLink: String,
  submissions: [{ type: Schema.Types.ObjectId, ref: 'SubmittedApplication' }],
}, { timestamps: true });

const submittedApplicationSchema = new Schema({
  applicationId: { type: Schema.Types.ObjectId, ref: 'Application' },
  fields: Schema.Types.Mixed,
}, { timestamps: true });

const paymentSchema = new Schema({
  tenantId: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Agency = mongoose.model('Agency', agencySchema);
const Property = mongoose.model('Property', propertySchema);
const Template = mongoose.model('Template', templateSchema);
const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);
const Reference = mongoose.model('Reference', referenceSchema);
const Application = mongoose.model('Application', applicationSchema);
const SubmittedApplication = mongoose.model('SubmittedApplication', submittedApplicationSchema);
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
  User,
  Agency,
  Property,
  Template,
  FormSubmission,
  Reference,
  Application,
  SubmittedApplication,
  Payment
};
