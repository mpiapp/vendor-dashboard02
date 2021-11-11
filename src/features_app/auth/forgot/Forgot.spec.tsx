import {screen, fireEvent ,render as renderRTL } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import Forgot from './Forgot';
import {
  sendEmail,
  ValueEmail,
} from './forgotSlice';

const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element forgot page", () => {
    it('should render all element in forgot page', () => {
        render(<Forgot />)
    
        // render navbar component
        expect(screen.getByAltText(/logo mpi/)).toBeInTheDocument()
        // render footer component
        expect(screen.getByText(/pt manajemen pemesanan indonesia/i)).toBeInTheDocument();
        expect(screen.getByText(/copyright/i)).toBeInTheDocument();
    
        // render main component
        expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name : 'Submit'})).toBeInTheDocument();
        expect(screen.getByRole('link', { name : "Back to Sign In" })).toBeInTheDocument();
    
    })

  })
  

describe("Dispatch redux", () => {
  it('should trigger onsubmit and dispatch', async () => {
    
    const {getByLabelText, getByRole} = render(<Forgot/>)

    await act(async () => {
      fireEvent.change(getByLabelText(/email address/i), {target: {value: "email@test.com"}})
    })

    await act(async () => {
      const data : ValueEmail = {
        email : 'email@test.com'
      }
      userEvent.click(getByRole("button"))
      const response = await store.dispatch(sendEmail(data))
      expect(response.payload).toEqual("Link for password change sent to email")
    })

  })
})


describe("forgot form", () => {
    describe("with invalid email", () => {
      it("renders the email validation error", async () => {
        const {getByLabelText, container} = render(<Forgot />)
        await act(async () => {
          const emailInput = getByLabelText(/email address/i)
          fireEvent.change(emailInput, {target: {value: "invalid email"}})
          fireEvent.blur(emailInput)
        })
        expect(container.innerHTML).toMatch("Email is invalid")

      })
    })
  
})