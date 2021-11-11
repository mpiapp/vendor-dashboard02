import ProfilePage from './ProfilePage';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element profile home page", () => {
    it('should render all element in profile home page', () => {
        render(<ProfilePage />)
    
        // render main component
        expect(screen.getByText(/profile/i)).toBeInTheDocument();

    })
})
