import Nav from '@/component/Nav';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Nav />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout