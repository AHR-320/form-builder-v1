const FormBuilderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-grow flex-col">
      {children}
    </div>
  );
};

export default FormBuilderLayout;
