const initialStates = { 
    customerList: [
        { sequence:1, cusGroup:'abc', cusName:'Harsh'},
    { sequence:2, cusGroup:'abc', cusName:'Harsh'},
    { sequence:3, cusGroup:'abc', cusName:'Harsh'},
    { sequence:4, cusGroup:'abc', cusName:'Harsh'},
    { sequence:5, cusGroup:'abc', cusName:'Harsh'},
    ]
}
export default function customerReducer(state = initialStates, action) {
    switch (action.type) {
        case 'EDIT_CUS_GROUP':
            return{
                ...state,
                ...state.customerList[action.payload.index].cusGroup = action.payload.cusGroup,
            }
        case 'EDIT_CUSTOMER_DETAILS':
            return{
                ...state,
                ...state.customerList[action.payload.index].cusGroup =action.payload.list.cusGroup,
                ...state.customerList[action.payload.index].cusName =action.payload.list.cusName,
            }
        case 'ADD_NEW_CUSTOMER': 
            state.customerList.push(action.payload.list)
            return{
                ...state,
            }
        case 'DELETE_CUSTOMER':
            const index = action.payload.index;
            return {
               ...state,
                customerList: [
                    ...state.customerList.slice(0, index),
                    ...state.customerList.slice(index + 1),
                ],
            }   
        
        case 'EDIT_CUS_NAME':
            return{
                ...state,
                ...state.customerList[action.payload.index].cusName = action.payload.cusName,
            }


        default: 
            return state;
    }
}