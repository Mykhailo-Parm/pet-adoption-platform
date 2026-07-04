import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoleGate from './components/RoleGate';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import CatalogPage from './pages/CatalogPage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import ApplicationFormPage from './pages/ApplicationFormPage';

import AccountLandingPage from './pages/AccountLandingPage';
import GuardianCabinetPage from './pages/GuardianCabinetPage';
import ApplicationDetailPage from './pages/ApplicationDetailPage';
import AccountProfilePage from './pages/AccountProfilePage';

import ShelterLandingPage from './pages/ShelterLandingPage';
import ShelterAnimalsPage from './pages/ShelterAnimalsPage';
import ShelterAnimalFormPage from './pages/ShelterAnimalFormPage';
import ShelterApplicationsPage from './pages/ShelterApplicationsPage';
import ShelterApplicationDetailPage from './pages/ShelterApplicationDetailPage';
import ShelterProfilePage from './pages/ShelterProfilePage';

import AdminLandingPage from './pages/AdminLandingPage';
import AdminSheltersPage from './pages/AdminSheltersPage';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/animals/:id" element={<AnimalDetailPage />} />
        <Route
          path="/animals/:id/apply"
          element={
            <RoleGate allow="GUARDIAN">
              <ApplicationFormPage />
            </RoleGate>
          }
        />

        <Route
          path="/account"
          element={
            <RoleGate allow="GUARDIAN">
              <AccountLandingPage />
            </RoleGate>
          }
        />
        <Route
          path="/account/applications"
          element={
            <RoleGate allow="GUARDIAN">
              <GuardianCabinetPage />
            </RoleGate>
          }
        />
        <Route
          path="/account/applications/:id"
          element={
            <RoleGate allow="GUARDIAN">
              <ApplicationDetailPage />
            </RoleGate>
          }
        />
        <Route
          path="/account/profile"
          element={
            <RoleGate allow="GUARDIAN">
              <AccountProfilePage />
            </RoleGate>
          }
        />

        <Route
          path="/shelter"
          element={
            <RoleGate allow="SHELTER_REP">
              <ShelterLandingPage />
            </RoleGate>
          }
        />
        <Route
          path="/shelter/animals"
          element={
            <RoleGate allow="SHELTER_REP">
              <ShelterAnimalsPage />
            </RoleGate>
          }
        />
        <Route
          path="/shelter/animals/new"
          element={
            <RoleGate allow="SHELTER_REP">
              <ShelterAnimalFormPage />
            </RoleGate>
          }
        />
        <Route
          path="/shelter/animals/:id/edit"
          element={
            <RoleGate allow="SHELTER_REP">
              <ShelterAnimalFormPage />
            </RoleGate>
          }
        />
        <Route
          path="/shelter/applications"
          element={
            <RoleGate allow="SHELTER_REP">
              <ShelterApplicationsPage />
            </RoleGate>
          }
        />
        <Route
          path="/shelter/applications/:id"
          element={
            <RoleGate allow="SHELTER_REP">
              <ShelterApplicationDetailPage />
            </RoleGate>
          }
        />
        <Route
          path="/shelter/profile"
          element={
            <RoleGate allow="SHELTER_REP">
              <ShelterProfilePage />
            </RoleGate>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleGate allow="ADMIN">
              <AdminLandingPage />
            </RoleGate>
          }
        />
        <Route
          path="/admin/shelters"
          element={
            <RoleGate allow="ADMIN">
              <AdminSheltersPage />
            </RoleGate>
          }
        />
      </Routes>
    </>
  );
}
