import styles from './Task.module.css';
import { Circle, Trash, CheckCircle } from 'phosphor-react'

interface taskProps {
    content: string;
    isDone: boolean;
    onComplete: () => void;
    toDelete: () => void;
}

export function Task({content, isDone, onComplete, toDelete}: taskProps) {
    
    return(
        isDone? (
            //Completa
            <div className={styles.taskCompleted}>
            <button className={styles.checkCompleted} onClick={onComplete}>
                <CheckCircle size={24} weight="fill"/>
            </button>
            <p>{content}</p>
            <button className={styles.rmvCompleted} title='Remover tarefa'onClick={toDelete}>
                <Trash size={24}/>
            </button>
        </div>
        ):(
            //A completar
            <div className={styles.task}>
            <button className={styles.check} onClick={onComplete}>
                <Circle size={24} weight="bold"/>
            </button>
            <p>{content}</p>
            <button className={styles.rmv} title='Remover tarefa' onClick={toDelete}>
                <Trash size={24}/>
            </button>
        </div>
        )

    )
}