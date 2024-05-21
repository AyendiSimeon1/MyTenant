const submitReferenceFormController = async (req, res) => {
    const { token, name, occupation, relationship, idDocument } = req.body;
  
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const updatedReference = await updateReference(decoded.id, {
        name,
        occupation,
        relationship,
        idDocument,
        isAuthenticated: true,
      });
  
      res.json(updatedReference);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const authenticateReferenceController = async (req, res) => {
    const { token, idDocument } = req.body;
  
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const updatedReference = await updateReference(decoded.id, {
        idDocument,
        isAuthenticated: true,
      });
  
      res.json(updatedReference);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const completeReferenceFormController = async (req, res) => {
    const { token, notes } = req.body;
  
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const updatedReference = await updateReference(decoded.id, { notes });
  
      // Send confirmation email
      const reference = await getReferenceById(decoded.id);
      await sendConfirmationEmail(reference.contactInfo, 'Reference Submission Confirmation', 'Thank you for providing your reference. Your input has been received and is appreciated.');
  
      res.json(updatedReference);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };