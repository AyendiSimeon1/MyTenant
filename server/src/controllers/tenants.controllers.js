const sendOnboardingLink = async (tenant, propertyId) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const token = jwt.sign({ id: tenant.id, propertyId }, config.JWT_SECRET, { expiresIn: '1d' });
    const link = `${process.env.FRONTEND_URL}/onboarding-form/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: tenant.username,
        subject: 'Onboarding Form Link',
        text: `Please complete the onboarding form using the following link: ${link}`
    };

    await transporter.sendMail(mailOptions);
};

const requestOnboardingForm = async (req, res) => {
    const { tenantId, propertyId } = req.body;

    try {
        const tenant = await prisma.user.findUnique({ where: { id: tenantId } });

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        await sendOnboardingLink(tenant, propertyId);

        res.status(200).json({ message: 'Onboarding link sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


const getOnboardingFormController = async (req, res) => {
    const { token } = req.params;
  
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const tenant = await getTenantById(decoded.id);
  
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }
  
      res.json({ tenantId: decoded.id, propertyId: decoded.propertyId });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

  const submitOnboardingFormController = async (req, res) => {
    const { token, personalInfo, employmentDetails, rentalHistory, references, idDocument } = req.body;
  
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
  
      const application = await createApplication({
        tenantId: decoded.id,
        propertyId: decoded.propertyId,
        personalInfo,
        employmentDetails,
        rentalHistory,
        idDocument,
        references: {
          create: references,
        },
      });
  
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Authenticate Identification
const authenticateIdentificationController = async (req, res) => {
    const { token, idDocument } = req.body;
  
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const updatedApplication = await updateApplicationIdDocument(decoded.id, idDocument);
  
      // Here, you would typically call the government verification API
      // For this example, we'll just return a success response
  
      res.json({ message: 'ID authenticated', updatedApplication });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
// Make Payment for Form/Registration
const makePaymentController = async (req, res) => {
    const { tenantId, amount } = req.body;
  
    try {
      const payment = await createPayment(tenantId, amount);
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
// Submit the Completed Application
const submitCompletedApplicationController = async (req, res) => {
    const { tenantId, applicationId } = req.body;
  
    try {
      const application = await updateApplicationStatus(applicationId, 'submitted');
  
      // Send confirmation email
      const tenant = await getTenantById(tenantId);
      await sendConfirmationEmail(tenant.username, 'Application Submission Confirmation', 'Your application has been submitted successfully. We will review it and get back to you soon.');
  
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Receive Payment Link for Property Upon Form Approval
const sendPaymentLinkForProperty = async (req, res) => {
    const { tenantId, propertyId } = req.body;

    try {
        const paymentLink = `https://payment.example.com/pay?propertyId=${propertyId}&tenantId=${tenantId}`;

        // Here, you would typically send an email with the payment link
        // For this example, we'll just return the link in the response

        res.json({ paymentLink });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};



