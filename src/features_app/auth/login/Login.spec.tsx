import LoginPage from './Login';
import { render as renderRTL, screen, fireEvent, } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import { loginAction } from './reducers/loginReducers'
import {
  DataUser,
  InputState
} from './loginTypes'

const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element login page", () => {
    it('should render all element in login page', () => {
        render(<LoginPage />)
    
        // render navbar component
        expect(screen.getByAltText(/logo mpi/)).toBeInTheDocument()
        // render footer component
        expect(screen.getByText(/pt manajemen pemesanan indonesia/i)).toBeInTheDocument();
        expect(screen.getByText(/copyright/i)).toBeInTheDocument();
    
        // render main component
        expect(screen.getByText("Sign In for Vendor")).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name : 'Sign In'})).toBeInTheDocument();
        // expect(screen.getByRole('link', { name: "Forgot password?" })).toBeInTheDocument();
    })
})


describe("Dispatch redux", () => {
  it('should trigger onsubmit and dispatch', async () => {
    
    const {getByLabelText, getByRole} = render(<LoginPage/>)

    await act(async () => {
      fireEvent.change(getByLabelText(/email address/i), {target: {value: "demo@admin.com"}})
      fireEvent.change(getByLabelText(/password/i), {target: {value: `${process.env.REACT_APP_PASSWORD_TEST}`}})
    })

    await act(async () => {
      const data : InputState = {
        email : 'demo@admin.com',
        password: `${process.env.REACT_APP_PASSWORD_TEST}`
      }

      const respondata : any = {
        "message": "Unauthorized",
        "statusCode": 401,
      }

      userEvent.click(getByRole("button"))
      const response = await store.dispatch(loginAction(data))
      expect(response.payload).toEqual(respondata)
    })

  })
})


describe("sign in form", () => {
  
    describe("with invalid email", () => {
      it("renders the email validation error", async () => {
        const {getByLabelText, container} = render(<LoginPage />)
  
        await act(async () => {
          const emailInput = getByLabelText(/email address/i)
          fireEvent.change(emailInput, {target: {value: "invalid email"}})
          fireEvent.blur(emailInput)
        })
        expect(container.innerHTML).toMatch("Email is invalid")

      })
    })
  
    describe("with invalid password", () => {
      it("renders the password validation error", async () => {
        const {getByLabelText, container} = render(<LoginPage />)
  
        await act(async () => {
          const paswordInput = getByLabelText(/password/i)
          fireEvent.change(paswordInput, {target: {value: "123"}})
          fireEvent.blur(paswordInput)
        })
  
        expect(container.innerHTML).toMatch("Password must be at least 6 characters")
  
      })
    })
})