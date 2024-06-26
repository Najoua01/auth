import React, { useState } from 'react';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import { City } from 'country-state-city';

countries.registerLocale(require('i18n-iso-countries/langs/fr.json')); // Enregistre la locale française

const Partenaires = () => {
    const defaultFormData = {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: '',
        pays: '',
        ville: '',
        codePostal: '',
        telephone: '',
        siteUrl: '',
        tva: '',
        contactNom: '',
        contactPrenom: '',
        contactEmail: '',
        contactTelephone: '',
        acceptConditions: false,
        role: 'partenaire'
    };

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(defaultFormData);
    const [errorMessage, setErrorMessage] = useState('');
    const countryOptions = ['BE', 'FR', 'LU', 'NL'].map(code => ({
        label: countries.getName(code, 'fr'),
        value: code
    }));
    const [cities, setCities] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCountryChange = (selectedOption) => {
        const countryCode = selectedOption.value;
        setFormData({
            ...formData,
            pays: selectedOption.label,
            ville: ''
        });
        setCities(City.getCitiesOfCountry(countryCode).map(city => ({ label: city.name, value: city.name })));
    };

    const handleCityChange = (selectedOption) => {
        setFormData({
            ...formData,
            ville: selectedOption.value,
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setErrorMessage('');

        for (let key in formData) {
            if (formData.hasOwnProperty(key) && !formData[key] && key !== 'role' && key !== 'acceptConditions') {
                setErrorMessage('Tous les champs doivent être remplis.');
                return;
            }
        }
    
        if (!formData.acceptConditions) {
            setErrorMessage('Vous devez accepter les conditions générales.');
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }
    
        // setErrorMessage('');   // je dois laisser ça ou pas?
        setStep(step + 1);
    };

    const handleRedirect = () => {
        window.location.href = '/';
    };

    return (
        <div>
            <div>
                <span>{step === 1 ? '1️⃣' : '1'}</span>
                <span>----------------------</span>
                <span>{step === 2 ? '2️⃣' : '2'}</span>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {step === 1 && (
                <div>
                    <h2>Information de contact</h2>
                    <form onSubmit={handleNext}>
                        <label>Nom</label>
                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" />
                        <br/>
                        <label>Prénom</label>
                        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" />
                        <br/>
                        <label>Adresse email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Adresse email" />
                        <br/>
                        <label>Mot de passe</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
                        <br/>
                        <label>Confirmer le mot de passe</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmer le mot de passe" />
                        <br/>
                        <label>Pays</label>
                        <Select
                            name="pays"
                            options={countryOptions}
                            value={countryOptions.find(option => option.label === formData.pays)}
                            onChange={handleCountryChange}
                            placeholder="Sélectionnez un pays"
                        />
                        <br/>
                        <label>Ville</label>
                        <Select
                            name="ville"
                            options={cities}
                            value={cities.find(option => option.value === formData.ville)}
                            onChange={handleCityChange}
                            placeholder="Sélectionnez une ville"
                            isDisabled={!formData.pays}
                        />
                        <br/>
                        <label>Code postal</label>
                        <input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} placeholder="Code postal" />
                        <br/>
                        <label>Téléphone</label>
                        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" />
                        <br/>
                        <label>Url du site</label>
                        <input type="text" name="siteUrl" value={formData.siteUrl} onChange={handleChange} placeholder="Url du site" />
                        <br/>
                        <label>Numéro de TVA</label>
                        <input type="text" name="tva" value={formData.tva} onChange={handleChange} placeholder="Numéro de TVA" />
                        <div>
                            <input type="checkbox" name="acceptConditions" checked={formData.acceptConditions} onChange={handleChange} />
                            <label htmlFor="acceptConditions">J'accepte les conditions générales de partenariat de YouCard</label>
                        </div>
                        <h3>Personne de contact</h3>
                        <label>Nom</label>
                        <input type="text" name="contactNom" value={formData.contactNom} onChange={handleChange} placeholder="Nom" />
                        <br/>
                        <label>Prénom</label>
                        <input type="text" name="contactPrenom" value={formData.contactPrenom} onChange={handleChange} placeholder="Prénom" />
                        <br/>
                        <label>Adresse email</label>
                        <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="Adresse email" />
                        <br/>
                        <label>Téléphone</label>
                        <input type="text" name="contactTelephone" value={formData.contactTelephone} onChange={handleChange} placeholder="Téléphone" />
                        <br/>
                        <button type="submit">Confirmer</button>
                    </form>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h2>Vérification du compte</h2>
                    <p>Merci d'avoir rempli le formulaire !<br/>
                    Nous allons maintenant vérifier votre compte et nous vous contacterons dans les plus brefs délais.</p>
                    <p>✔</p>
                    <button onClick={handleRedirect}>Revenir à la page d'accueil</button>
                </div>
            )}
        </div>
    );
};

export default Partenaires;
