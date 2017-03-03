import React from 'react'
import AutoComplete from 'material-ui/AutoComplete';

const AutoCompleteRedux = ({ input, label, placeholder, dataSource, meta: { touched, error }, ...custom }) => (
    <AutoComplete hintText={placeholder}
                  floatingLabelText={label}
                  searchText={input.value}
                  errorText={touched && error}
                  listStyle={ {overflowY: 'auto', maxHeight: '50vh'} }
                  fullWidth={true}
                  filter={(searchText, key) => (AutoComplete.caseInsensitiveFilter(searchText, key) || searchText === '')}
                  openOnFocus={true}
                  dataSource={dataSource}
                  {...input}
                  {...custom}
    />
)

export default AutoCompleteRedux;