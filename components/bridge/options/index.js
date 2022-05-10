import { useState, useEffect } from 'react'
import _ from 'lodash'
import Switch from 'react-switch'
import { RiSettings3Line } from 'react-icons/ri'
import { MdSettingsSuggest } from 'react-icons/md'

import Modal from '../../modals'

export default ({
  disabled = false,
  applied = false,
  initialData,
  onChange,
}) => {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  const reset = () => setData(initialData)

  const fields = [
    {
      label: 'Recipient Address',
      name: 'to',
      type: 'text',
      placeholder: 'target contract or recipient address',
    },
    {
      label: 'Infinite Approval',
      name: 'infiniteApprove',
      type: 'switch',
    },
    {
      label: 'Call Data',
      name: 'callData',
      type: 'textarea',
      placeholder: 'encoded calldata to execute on receiving chain',
    },
  ]

  const hasChanged = !_.isEqual(data, initialData)

  return (
    <Modal
      disabled={disabled}
      buttonTitle={<div className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-lg p-2">
        {applied ?
          <MdSettingsSuggest size={20} className="text-green-600 hover:text-green-500 dark:text-white dark:hover:text-slate-100 mb-0.5" />
          :
          <RiSettings3Line size={20} className="text-slate-400 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-200" />
        }
      </div>}
      buttonClassName={`min-w-max ${disabled ? 'cursor-not-allowed' : ''} ${applied ? 'ring-2 ring-green-500 dark:ring-white' : ''} rounded-lg shadow flex items-center justify-center`}
      title="Options"
      body={<div className="form mt-2">
        {fields.map((f, i) => (
          <div key={i} className="form-element">
            {f.label && (
              <div className="form-label text-slate-600 dark:text-slate-400 font-medium">
                {f.label}
              </div>
            )}
            {f.type === 'select' ?
              <select
                placeholder={f.placeholder}
                value={data?.[f.name]}
                onChange={e => setData({ ...data, [`${f.name}`]: e.target.value })}
                className="form-select bg-slate-50 border-0 focus:ring-0 rounded-lg"
              >
                {f.options?.map((o, i) => (
                  <option
                    key={i}
                    title={o.title}
                    value={o.value}
                  >
                    {o.name}
                  </option>
                ))}
              </select>
              :
              f.type === 'switch' ?
                <Switch
                  checked={typeof data?.[f.name] === 'boolean' ? data[f.name] : false}
                  onChange={() => setData({ ...data, [`${f.name}`]: !data?.[f.name] })}
                  onColor="#3b82f6"
                  onHandleColor="#f8fafc"
                  offColor="#64748b"
                  offHandleColor="#f8fafc"
                />
                :
                f.type === 'textarea' ?
                  <textarea
                    type="text"
                    rows="5"
                    placeholder={f.placeholder}
                    value={data?.[f.name]}
                    onChange={e => setData({ ...data, [`${f.name}`]: e.target.value })}
                    className="form-textarea border-0 focus:ring-0 rounded-lg"
                  />
                  :
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={data?.[f.name]}
                    onChange={e => setData({ ...data, [`${f.name}`]: e.target.value })}
                    className="form-input border-0 focus:ring-0 rounded-lg"
                  />
            }
          </div>
        ))}
      </div>}
      onCancel={() => reset()}
      confirmDisabled={!hasChanged}
      onConfirm={() => {
        if (onChange) {
          onChange(data)
        }
      }}
      confirmButtonTitle="Apply"
      onClose={() => reset()}
    />
  )
}