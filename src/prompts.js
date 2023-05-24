export const INDEX_VALIDATOR = {
    SYSTEM_MESSAGE: {
        role: 'user',
        content: "Identifica a qué claves de '$job' se están asigando los tags de un archivo XML. Los tags del XML están mapeados en una variable llamada '$j'. Te voy a proporcionar un JSON a partir de [[START]] con dos keys: 'Code' y 'Tags', el cual finaliza en [[END]]. 'Code': Contiene el código PHP que asigna los tags del XML a las claves de '$job'. 'Tags': Contiene los tags del XML en formato JSON. Tu tarea es igualar los tags disponibles en el XML con la asignación en el código PHP y agrupar los tags que no están siendo asignados a ninguna clave de $job en PHP. Debes tener en cuenta que los comentarios en el código no aplican, es decir, debes omitirlos.Luego, debes entregarme un JSON con la siguiente estructura:Key: 'AssignedTags'Value: JSON que contiene los tags (Teniendo en cuenta la estructura original), pero sólamente con los tags que estén siendo asignados a una clave de '$job' en el código. La 'key' es la ruta de acceso a la propiedad en el JSON y el 'value' sería la clave de '$job' donde se está asignando el 'tag' en el 'code'. Si un 'tag' está siendo asignado a varias claves de '$job', el value sería un array con las claves. Key: 'UnassignedTags'Value: JSON con la ruta a los tags disponibles en el XML que no fueron asignados a ninguna clave de '$job' en 'code'"
    },
    EXAMPLES_MESSAGES: [
        {
            role: 'user',
            content: ''
        },
        {
            role: 'assistant',
            content: '',
        },
        {
            role: 'user',
            content: ''
        },
        {
            role: 'assistant',
            content: '',
        },
    ]
}

export const CODE_ERRORS = {
    SYSTEM_MESSAGE: {

    }
}

export const REFACTOR_CODE = {
    SYSTEM_MESSAGE: {

    }
}