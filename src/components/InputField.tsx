import { useField } from 'formik'

export const InputField = ({ ...props }) => {
  const [field, meta] = useField(props.name)
  const styleInputError = meta.touched && meta.error && 'cc-input-error'
  return (
    <div>
      <input className={`cc-input ${styleInputError}`} {...props} {...field} />
      {meta.touched && meta.error && (
        <div className='mt-1 text-pink-600 text-sm'>{meta.error}</div>
      )}
    </div>
  )
}
