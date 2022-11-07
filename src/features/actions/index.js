export const addCustomerDetails = (list) => {
    return { 
        type: 'ADD_NEW_CUSTOMER', payload: { list } }
}
export const deleteCustomerDetails = ({ index }) => {
    return { type: 'DELETE_CUSTOMER', payload: { index } }
}

export const editCusGroup = ({ index, cusGroup }) => {
    return {
        type: 'EDIT_CUS_GROUP', payload: { index, cusGroup }
    }
}
export const editCusName = ({ index, cusName }) => {
    return {
        type: 'EDIT_CUS_NAME', payload: { index, cusName }
    }
}
export const editCustomerDetails = (index, list) => {
    return{
        type: 'EDIT_CUSTOMER_DETAILS', payload: {index, list}
    }
}
