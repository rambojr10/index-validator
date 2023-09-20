import { PropTypes } from 'prop-types'
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/theme-one_dark"
import "ace-builds/src-noconflict/theme-solarized_dark"

export function Editor({ mode, name, value }) {
    return (
        <AceEditor
            mode={mode}
            theme="one_dark"
            name={name}
            value={value}
            width="100%"
            readOnly={true}
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            wrapEnabled={false}
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                autoScrollEditorIntoView: true
            }}
        />
    )
}

Editor.propTypes = {
    mode: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}