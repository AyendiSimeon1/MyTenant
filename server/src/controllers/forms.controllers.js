require('dotenv').config();
const { createForm, getForm, responseForm, addRefrence } = require('../crud/forms.crud');
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

const refrenceController = async (req, res) => {
    try {
        const formData = req.body;

        const createReference = await addRefrence(formData);

        res.status(201).json({ message: 'Reference created', createReference });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'});
    }

};
      

module.exports = { createFormsControllers, getFormController, formResponseController, refrenceController }

