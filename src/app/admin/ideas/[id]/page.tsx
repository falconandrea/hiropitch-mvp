'use client';

import Loading from '@/components/Loading';
import { getIdea } from '@/lib/actions/idea.actions';
import { InferfaceIdea } from '@/lib/interfaces';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CAROUSEL_ITEMS } from '../../consts'; // Assicurati che questo sia il percorso corretto
import styles from '../IdeaDetailPage.module.css'; // Importa il file CSS

export default function IdeaDetailPage() {
  // Get id idea from url
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<InferfaceIdea>();
  const { id } = params;

  useEffect(() => {
    const fetchIdea = async (id: string) => {
      const data = await getIdea(id);
      setIdea(data);
      setLoading(false);
      console.log(data);
    };

    setLoading(true);
    fetchIdea(id);
  }, []);

  const getImageForIdea = (title: string) => {
    const imageEntry = CAROUSEL_ITEMS.find(entry => entry.name === title);
    const imageID = CAROUSEL_ITEMS.find(entry => entry.name === title);
    return imageEntry ? imageEntry.image : '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {loading && <Loading />}
        {idea ? (
          <div className={styles.ideaDetails}>
            <div className={styles.titleContainer}>
              <p className={styles.label}><strong>Title:</strong></p>
              <p className={styles.value}>{idea.title}</p>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={`/carousel/${getImageForIdea(idea.title)}`} // Utilizza la funzione per ottenere il percorso dell'immagine
                className={styles.image}
              />
              <span className={styles.imageId}>ID: {idea._id}</span>
            </div>
            <p className={styles.label}><strong>Description:</strong></p>
            <p className={styles.value}>{idea.description}</p>
            <p className={styles.label}><strong>Category:</strong></p>
            <p className={styles.value}>{idea.category}</p>
            <p className={styles.label}><strong>Contract Type:</strong></p>
            <p className={styles.value}>{idea.contractType}</p>
            <p className={styles.label}><strong>Reference links:</strong></p>
            <ul className={styles.linkList}>
              {idea.referenceLinks.map((link) => (
                <li key={link} className={styles.linkItem}>
                  <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </li>
              ))}
            </ul>
            <p className={styles.label}><strong>Creator:</strong></p>
            <p className={styles.value}>
              {idea.creatorId.firstName + ' ' + idea.creatorId.lastName}
            </p>
            <p className={styles.label}><strong>Authors:</strong></p>
            <ul className={styles.authorList}>
              {idea.authors.map((author) => (
                <li key={author._id} className={styles.authorItem}>
                  {author.firstName + ' ' + author.lastName}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
