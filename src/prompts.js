export const INDEX_VALIDATOR = {
    SYSTEM_MESSAGE: {
        role: 'system',
        // content: `
        //     Identifica qué propiedades del Array 'tags' están siendo asignadas a una variable de '$job'. Estas propiedades están mapeadas en la variable '$j'. 
        //     Te voy a proporcionar un JSON a partir de [START] con dos keys: 'code' y 'tags', el cual finaliza en [END]. 
        //     'code': Tiene el código que asigna las propiedades del Array 'tags' a las variables de '$job'. 
        //     'tags': Contiene el Array con las propiedades mapeadas. 
        //     Tu tarea es agregar como 'value' a cada propiedad del Array 'tags' la o las variables de '$job' que están referenciando a esas propiedades directa o indirectamente.
        //     Posteriormente agruparlas en 'AssignedTags', es importante mencionar que debes agrupar las propiedades exactamente como están en el Array 'tags'. 
        //     Seguidamente para las propiedades que no están siendo asignadas en el código debes hacer lo mismo pero estas las vas a agrupar en 'UnassignedTags'. Debes tener en cuenta que los comentarios en el código no aplican, es decir, debes omitirlos. 
        //     Luego, debes entregarme un JSON con la siguiente estructura: 
        //     Key: 'AssignedTags' 
        //     Value: JSON que contiene las propiedades que están siendo referenciadas en el código (Teniendo en cuenta la estructura del Array 'tags' original). A cada una de estas propiedades vas a agregarle como 'value', la variable de '$job' que está apuntando en el código a esa propiedad. Si una propiedad está siendo asignada a varias variables de '$job', el 'value' sería un array con las variables. 
        //     Key: 'UnassignedTags'
        //     Value: Array 'tags' original únicamente con las propiedades no asignadas en el código. Su 'value' será null.
        // `
        content: `Identify which properties of the ‘tags’ Array are being assigned to a ‘$job’ variable. These properties are mapped in the ‘$j’ variable. I will provide you with a JSON starting from [START] with two keys: ‘code’ and ‘tags’, which ends at [END]. ‘code’: Contains the code that assigns the properties of the ‘tags’ Array to the ‘$job’ variables. ‘tags’: Contains the Array with the mapped properties. Your task is to add as ‘value’ to each property of the ‘tags’ Array the ‘$job’ variable or variables that are directly or indirectly referencing those properties. Then group them into ‘AssignedTags’, it is important to mention that you must group the properties exactly as they are in the ‘tags’ Array. Next, for the properties that are not being assigned in the code, you must do the same but group these into ‘UnassignedTags’. Keep in mind that comments in the code do not apply, i.e., you must omit them. Then, deliver a JSON with the following structure: Key: ‘AssignedTags’ Value: JSON containing the properties that are being referenced in the code (Taking into account the structure of the original ‘tags’ Array). To each of these properties you will add as ‘value’, the ‘$job’ variable that is pointing to that property in the code. If a property is being assigned to several ‘$job’ variables, the ‘value’ would be an array with the variables. Key: ‘UnassignedTags’ Value: Original ‘tags’ Array only with properties not assigned in the code. Its ‘value’ will be null.`
    },
    EXAMPLES_MESSAGES: [
        // Scanid: 263384
        {
            role: 'user',
            content: `[START] {"code": $city = trim((string) $j["location"]["city"]);$state = trim((string) $j["location"]["state"]);$country = trim((string) $j["location"]["country"]);$arrloc = array();if ($city) $arrloc[] = $city;if ($state) $arrloc[] = $state;if ($country) $arrloc[] = $country;$loc = implode(", ", $arrloc);$job = array();$job['temp'] = "1";$job['title'] = (String) $j["title"];$job['source_location'] = $loc;$job['location'] = $loc;$job['source_city'] = $city;$job['source_state'] = $state;$job['source_country'] = $country;$job['url'] = (String) $j["detail-url"];$job['source_empname'] = (String) $j["company"]["name"];$job['reqid'] = (String) $j["job-code"];$job['html'] = (String) $j["description"]["summary"];$job['jobdesc'] = tools::stripTags($job['html']);$souppc = preg_replace('/[^0-9.,]+/', '', (String) $j["cpc"]);if (preg_match('/[.,]+/', $souppc)) {    $job['source_ppc'] = round($souppc * 100);} else {    $job['source_ppc'] = $souppc;}, "tags": ["title","job-code","detail-url","job-category",{"description":["summary","required-education","required-experience"]},"cpc","posted-date",{"location":["city","state","zip","country"]},{"company":["name"]},"PriortyJob",{"salarydetail":["SalaryMin","SalaryMax","SalaryType"]}]} [END]`
        },
        {
            role: 'assistant',
            content: `{"AssignedTags":{"title":"$job['title']","detail-url":"$job['url']","job-code":"$job['reqid']","description":{"summary":["$job['html']","$job['jobdesc']"]},"cpc":"$job['source_ppc']","location":{"city":"$job['source_city']","state":"$job['source_state']","country":"$job['source_country']"},"company":{"name":"$job['source_empname']"}},"UnassignedTags":{"job-category":null,"description":{"required-education":null,"required-experience":null},"posted-date":null,"location":{"zip":null},"PriortyJob":null,"salarydetail":{"SalaryMin":null,"SalaryMax":null,"SalaryType":null}}}`
        },
        // Scanid: 226910
        {
            role: 'user',
            content: `[START] {"code": $city = trim((string) $j["position"]["location"]["name"]);$country = trim((string) $j["position"]["location"]["country"]["code"]);$arrloc = array_filter([$city, $country]);$loc = implode(", ", array_unique($arrloc));$job = array();$job['temp'] = "1";$job['title'] = trim((String) $j["position"]["title"]);$job['location'] = $loc;$job['source_location'] = $loc;$job['source_city'] = $city;$job['source_country'] = $country;$job['source_empname'] = trim((String) $j["company"]["name"]);$job['source_salary'] = trim((String) $j["salary"]);$job['url'] = trim((String) $j['how-to-apply']["applicationurl"]);$job['reqid'] = trim((String) $j['partner-job-id']);$job['html'] = trim((String) $j["position"]["description"]);$job['html'] = explode("If you want to join", $job['html'])[0];$job['html'] = explode("For a confidential", $job['html'])[0];$job['html'] = explode("Simply hit the APPLY button", $job['html'])[0];$job['html'] = explode("Please apply", $job['html'])[0];$job['html'] = explode("If you are an existing Mortgage", $job['html'])[0];$job['jobdesc'] = tools::stripTags($job['html']);, "tags": ["partner-job-id",{"company":["name"]},{"position":["title","description",{"location":["name",{"country":["code"]}]},{"job-functions":[{"job-function":["code"]}]},{"industries":[{"industry":["code"]}]},{"job-type":["code"]},{"experience-level":["code"]}]},{"how-to-apply":["applicationurl"]},"salary"]} [END]`
        },
        {
            role: 'assistant',
            content: `{"AssignedTags":{"position":{"title":"$job['title']","location":{"name":"$job['source_city']","country":{"code":"$job['source_country']"}},"description":["$job['html']","$job['jobdesc']"]},"company":{"name":"$job['source_empname']"},"salary":"$job['source_salary']","how-to-apply":{"applicationurl":"$job['url']"},"partner-job-id":"$job['reqid']"},"UnassignedTags":{"position":{"job-functions":{"job-function":{"code":null}},"industries":{"industry":{"code":null}},"job-type":{"code":null},"experience-level":{"code":null}}}}`
        },
        // Scanid: 263423 / API
        {
            role: 'user',
            content: `[START] {"code": $city = $j["address"]["city"];$state = $j["address"]["state"];$country = $j["address"]["countryCode"];$arrloc = array_filter([$city, $state, $country]);$loc = implode(", ", array_unique($arrloc));$job = [];$job['title'] = trim((String) $j["title"]);$job['location'] = $loc;$job['source_location'] = $loc;$job['source_city'] = $city;$job['source_state'] = $state;$job['source_country'] = $country;$job['source_empname'] = "LeaderStat";$job['reqid'] = trim((String) $j["id"]);$job['url'] = "https://www.leaderstat.com/search-jobs/";$job["apply_client_jobid"] = $j["id"];$job["apply_api_endpoint"] = "https://auth.bullhornstaffing.com/oauth/authorize";$job['source_jobtype'] = trim((String) $j["employmentType"]);$job['html'] = (String) $j["publicDescription"];$job['jobdesc'] = Tools::stripTags($job['html']);$job['temp'] = '22052023';$job['client_tag'] = (String) $j["customText16"];, "tags": [{"address":["address1","address2","city","countryCode","countryName","state","timezone","zip"]},"employmentType","title","publicDescription","status","customText1","customText2","customText3","customText16","customText17"]} [END]`
        },
        {
            role: 'assistant',
            content: `[START] {"AssignedTags":{"address":{"city":"$job['source_city']","state":"$job['source_state']","countryCode":"$job['source_country']"},"employmentType":"$job['source_jobtype']","title":"$job['title']","publicDescription":["$job['html']","$job['jobdesc']"],"customText16":"$job['client_tag']"},"UnassignedTags":{"address":{"address1":null,"address2":null,"countryName":null,"timezone":null,"zip":null},"status":null,"customText1":null,"customText2":null,"customText3":null,"customText17":null}} [END]`
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