import SettingPage from './SettingPage';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element teams setting page", () => {
    it('should render all element in teams setting page', () => {
        render(<SettingPage />)
    
        // render main component
        expect(screen.getByText(/setting/i)).toBeInTheDocument();

    })
})
