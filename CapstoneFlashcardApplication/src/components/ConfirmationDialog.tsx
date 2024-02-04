import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
const handleConfirm = () => {
    onConfirm();
};

const handleCancel = () => {
    onCancel();
};

return (
<div className="confirmation-dialog flex flex-col justify-center items-center mx-auto font-medium">
    <p>{message}</p>
    <button className="bg-[#00df9a] hover:bg-[#4DE3B5] rounded-md font-medium h-8 w-[100px] my-6" onClick={handleConfirm}>Confirm</button>
    <button className="bg-red-400  hover:bg-red-300 rounded-md font-medium h-8 w-[100px] my-6" onClick={handleCancel}>Cancel</button>
</div>
);
};

export default ConfirmationDialog;