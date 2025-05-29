import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';

// Import components
import Home from './components/Home';
import RegisterFarmer from './components/farmers/RegisterFarmer';
import ShowFarmers from './components/farmers/ShowFarmers';
import BuyMilk from './components/farmers/BuyMilk';
import PayFarmer from './components/farmers/PayFarmer';
import MilkBifurcation from './components/materials/MilkBifurcation';
import RegisterVendor from './components/vendors/RegisterVendor';
import ShowVendors from './components/vendors/ShowVendors';
import ProductPrices from './components/vendors/ProductPrices';
import VendorStatus from './components/vendors/VendorStatus';
import VendorPayments from './components/vendors/VendorPayments';
import VendorTransactions from './components/vendors/VendorTransactions';
import SellProducts from './components/products/SellProducts';
import ProductProduction from './components/products/ProductProduction';
import StockManagement from './components/products/StockManagement';
import Logistics from './components/logistics/Logistics';
import LogisticsDetails from './components/logistics/LogisticsDetails';
import ManageTrucks from './components/logistics/ManageTrucks';
import TruckDetails from './components/logistics/TruckDetails';
import Overhead from './components/expenses/Overhead';
import OverheadDetails from './components/expenses/OverheadDetails';
import RawMaterials from './components/materials/RawMaterials';
import UseRawMaterial from './components/materials/UseRawMaterial';
import RawMaterialsDetails from './components/materials/RawMaterialsDetails';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-farmer" element={<RegisterFarmer />} />
        <Route path="/show-farmers" element={<ShowFarmers />} />
        <Route path="/buy-milk" element={<BuyMilk />} />
        <Route path="/pay-farmer" element={<PayFarmer />} />
        <Route path="/milk-bifurcation" element={<MilkBifurcation />} />
        <Route path="/register-vendor" element={<RegisterVendor />} />
        <Route path="/show-vendors" element={<ShowVendors />} />
        <Route path="/product-prices" element={<ProductPrices />} />
        <Route path="/vendor-status" element={<VendorStatus />} />
        <Route path="/vendor-payments" element={<VendorPayments />} />
        <Route path="/vendor-transactions" element={<VendorTransactions />} />
        <Route path="/sell-products" element={<SellProducts />} />
        <Route path="/product-production" element={<ProductProduction />} />
        <Route path="/stock-management" element={<StockManagement />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/logistics-details" element={<LogisticsDetails />} />
        <Route path="/manage-trucks" element={<ManageTrucks />} />
        <Route path="/truck-details" element={<TruckDetails />} />
        <Route path="/overhead" element={<Overhead />} />
        <Route path="/overhead-details" element={<OverheadDetails />} />
        <Route path="/raw-materials" element={<RawMaterials />} />
        <Route path="/use-raw-materials" element={<UseRawMaterial />} />
        <Route path="/raw-materials-details" element={<RawMaterialsDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
