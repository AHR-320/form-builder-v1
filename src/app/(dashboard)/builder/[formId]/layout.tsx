const FormBuilderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-grow">{children}</div>
  );
};

export default FormBuilderLayout;
