import forgotReducer, {
    sendEmail,
    postEmail
  } from './forgotSlice';
import { store } from '../../../app/store'
  


describe('INITAL STATE STORE FORGOTSLICE', () => {
    it('should handle initial state', () => {
      expect(forgotReducer(undefined, { type: 'unknown' })).toEqual({
        forgot: false,
        loading : false,
        error : null
      });
    });
  
});

it('response success send email', async () => {
  const value = {
    email: "hello@email.com"
  }
  const res = await postEmail(value)
  expect(res).toEqual(value)
})


it('dispatch forgot success action', async () => {
  const data : any = {
    email : 'demo@admin.com'
  }
  const response = await store.dispatch(sendEmail(data))
  expect(response.payload).toEqual("Link for password change sent to email")
});


describe('LOGIN SLICE TESTS', () => {
  it('should set loading true while action is pending', () => {
      const action = {type: sendEmail.pending};
      const initialState = forgotReducer(
      { 
        forgot: false,
        loading : false,
        error : null
      }, action);
      expect(initialState).toEqual(
        {
          forgot: false,
          loading : true,
          error : null
        }
      )
    })

  it('should set forgot state when action is fulfilled', () => {
      const action = {
          type: sendEmail.fulfilled, 
          payload:{ 
            data : {
              email : "johndoe@email.com"
            }
          }
      };
      const initialState = forgotReducer(
        { 
          forgot: true,
          loading : false,
          error : null
        }, action);
        expect(initialState).toEqual(
          {
            forgot: true,
            loading : false,
            error : null
          }
        )
  })

  it('should set error when action is rejected', () => {
      const action = {
        type: sendEmail.rejected,
        payload : "Error Server"
      };
      const initialState = forgotReducer(
        { 
          forgot: false,
          loading : false,
          error : null
        }, action);
        expect(initialState).toEqual(
          {
            forgot: false,
            loading : false,
            error : "Error Server"
          }
        )
    })
})