import React, { useState, useMemo, useEffect } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonListHeader,
  IonMenu,
  IonNote,
} from '@ionic/react';
import { Context } from './Context';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { phonePortraitOutline, womanOutline, manOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

interface Item {
  name: string;
  category: string;
}

const appPages: AppPage[] = [
  {
    title: 'Ropa Para Dama',
    url: '/page/categoria/RopaParaDama',
    iosIcon: womanOutline,
    mdIcon: womanOutline,
  },
  {
    title: 'Ropa Para Caballero',
    url: '/page/categoria/RopaParaCaballero',
    iosIcon: manOutline,
    mdIcon: manOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const contextValue = useContext(Context);
  const [searchText, setSearchText] = useState('');
  const labels = ['contact center'];

  const data: Record<string, Item[]> = {
    "Ropa de Dama": [
      { name: "Vestidos", category: "Ropa de Dama" },
      { name: "Pantalones", category: "Ropa de Dama" },
      { name: "Shorts", category: "Ropa de Dama" },
      { name: "Faldas", category: "Ropa de Dama" },
      // Agregar más elementos en esta categoría
    ],
    "Ropa de Hombre": [
      { name: "Camisa", category: "Ropa de Hombre" },
      { name: "Remera", category: "Ropa de Hombre" },
      { name: "Pantalón", category: "Ropa de Hombre" },
      // Agregar más elementos en esta categoría
    ],
    "Cosmetico": [
      { name: "Labial", category: "Cosmetico" },
      { name: "Mascaras", category: "Cosmetico" },
      // Agregar más elementos en esta categoría
    ],
    "Accesorios": [
      { name: "Cartera Dama", category: "Accesorios" },
      { name: "Cartera Hombre", category: "Accesorios" },
      { name: "Anillos", category: "Accesorios" },
      // Agregar más elementos en esta categoría
    ],
    "Calzados": [
      {name: 'Calzados de Dama', category: 'Calzados'},
      {name: 'Calzados de Hombre', category: 'Calzados'},
      // Agregar más elementos en esta categoría
    ],
    
    // Agregar más categorías y elementos según sea necesario
  };

// Estado para controlar el acordeón abierto
const [openAccordion, setOpenAccordion] = useState<string | null>(null);
// Estado adicional para controlar la apertura al hacer clic
const [clickedAccordion, setClickedAccordion] = useState<string | null>(null);

// Función para cambiar el estado del acordeón al hacer clic
const handleClickAccordion = (category: string) => {
  setClickedAccordion((prevClickedAccordion) =>
    prevClickedAccordion === category ? null : category
  );
};

// Función para cambiar el estado del acordeón
const toggleAccordion = (category: string) => {
  setOpenAccordion((prevOpenAccordion) => {
    if (prevOpenAccordion === category) {
      return null; // Si ya está abierto, ciérralo
    } else {
      return category; // Si está cerrado, ábrelo
    }
  });
};

  // Función para filtrar los datos en tiempo real mientras escribes
  const filteredData = useMemo(() => {
    return Object.keys(data).reduce((result, category) => {
      const filteredItems = data[category].filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      if (filteredItems.length > 0) {
        result[category] = filteredItems;
      }
      return result;
    }, {} as Record<string, Item[]>);
  }, [data, searchText]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setOpenAccordion(null); // Cierra todas las categorías si el filtro está en blanco
      return;
    }
  
    const matchingCategory = Object.keys(filteredData).find((category) =>
      filteredData[category].some((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  
    if (matchingCategory) {
      setOpenAccordion(matchingCategory);
    } else {
      setOpenAccordion(null);
    }
  }, [filteredData, searchText]);


  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{contextValue?.name}</IonListHeader>
          <IonNote>perfil</IonNote>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value || '')} // Usar onIonInput en lugar de onIonChange
          />

{Object.keys(filteredData).map((category, index) => (
  <div key={index}>
    <IonItem
      button
      onClick={() => {
        handleClickAccordion(category); // Manejar eventos de clic para abrir/cerrar
        toggleAccordion(category); // Actualizar el estado local del acordeón
      }}
      color="primary"
    >
      <IonLabel>{category}</IonLabel>
    </IonItem>
    {(openAccordion === category || clickedAccordion === category) && (
      <div className="ion-padding">
        <IonList>
          {filteredData[category].map((item: Item, itemIndex: number) => (
            <IonItem key={itemIndex}>
              <IonLabel>{item.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </div>
    )}
  </div>
))}

        </IonList>
        <IonList id="labels-list">
          <IonListHeader>Contacto</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={phonePortraitOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
