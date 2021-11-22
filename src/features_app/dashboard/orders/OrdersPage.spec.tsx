import OrdersPage from './OrdersPage';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard home page", () => {
    it('should render all element in dashboard home page', () => {
        render(<OrdersPage />)
    
        // render main component
        expect(screen.getByText(/Orders page is cooming soon/)).toBeInTheDocument();

    })
})
