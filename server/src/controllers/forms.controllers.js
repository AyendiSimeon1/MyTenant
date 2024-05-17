require('dotenv').config();
const { ReferSip } = require('twilio/lib/twiml/VoiceResponse');
const { createForm, getForm, responseForm } = require('../crud/forms.crud');
const { v4: uuidv4 } = require('uuid');



const createFormsControllers = async (req, res) => {
    try {
        const formData = req.body;
        const formId = uuidv4(); 
        const form = await createForm({ ...formData, formId });
        const formLink = `http://127.0.0.1:3001/forms/${formId}`;

        return res.status(201).json({ message: 'Form created succesfully', form,  formLink });
        
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}

const getFormController = async (req, res) => {
    const formId = req.params;
    const form = await getForm(formId);
    return res.status(200).json({ form });
}

const formResponseController = async (req, res) => {
    const { formId } = req.params;
    const formData = req.body;

    const submitForm = await responseForm(formId, formData);

    
}


      
    


module.exports = { createFormsControllers, getFormController, formResponseController }

