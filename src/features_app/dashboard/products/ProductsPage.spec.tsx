import ProductsPage from './ProductsPage';
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
        render(<ProductsPage />)
    
        // render main component
        expect(screen.getByText(/products/i)).toBeInTheDocument();

    })
})
