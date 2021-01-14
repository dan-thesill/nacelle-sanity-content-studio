import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'

import { Heading, Box, TextInput, Inline, Button } from '@sanity/ui'
import NacelleData from './NacelleIndexEntries'
import { GET_PRODUCTS, GET_COLLECTIONS } from '../queries'

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(value))

const HandleContext = React.createContext('')

const handleHailFrequencyData = (res, queryName) =>
  res && res.data && res.data[queryName] && res.data[queryName].items

export const NacelleProducts = () => (
  <NacelleData
    title="Products"
    query={GET_PRODUCTS}
    dataHandler={(res) => handleHailFrequencyData(res, 'getProducts')}
  />
)

export const NacelleCollections = () => (
  <NacelleData
    title="Collections"
    query={GET_COLLECTIONS}
    dataHandler={(res) => handleHailFrequencyData(res, 'getCollections')}
  />
)

const NacelleLinker = ({ type, onChange }) => {
  const handle = useContext(HandleContext)

  return (
    <HandleContext.Provider>
      <FormField>
        <Heading as="h2" size={1}>
          {type.title}
        </Heading>
        <Box>
          <Inline space={[4]} style={{ marginTop: '1em' }}>
            <TextInput
              value={handle}
              onChange={(event) =>
                onChange(createPatchFrom(event.target.value))
              }
              disabled
            />
            <Button
              fontSize={[2, 2, 3]}
              mode="ghost"
              padding={[2, 2, 3]}
              text="Select"
            />
          </Inline>
        </Box>
        <NacelleCollections />
        <NacelleProducts />
      </FormField>
    </HandleContext.Provider>
  )
}

NacelleLinker.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

export default React.forwardRef((props, ref) => (
  <NacelleLinker {...props} forwardedRef={ref} />
))