"use client";
//admin/dashboard/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import {
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  LogOut,
  Plus,
  Type,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProjectFormData {
  title: string;
  description: string;
  image_url: string;
  github_url: string;
  demo_url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  image_path: string;
  github_url: string;
  demo_url: string;
  created_at: string;
}

const initialFormData: ProjectFormData = {
  title: "",
  description: "",
  image_url: "",
  github_url: "",
  demo_url: "",
};


//******************************************************************************* */
//*************************** interfaces technologies data ********************** */
/******************************************************************************* */
interface TechnologyFormData {
  name: string;
  image_url: string;
  image_path: string;
  type: string;
}

interface Technology {
  id: number;
  name: string;
  image_url: string;
  image_path: string;
  type: string;
  created_at: string;
}


const initial2FormData: TechnologyFormData = {
  name: "",
  image_url: "",
  image_path: "",
  type: "",
 
};


export default function AdminDashboardPage() {

  //const y declaraciones para projects 
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const router = useRouter();


//*********************************************************************** */
//const y declaraciones para technologies  |  |  |
//                                         v  v  v
//************************************************************************* */
  const [formDataTech, setFormDataTech] = useState<TechnologyFormData>(initial2FormData);
  const [isSubmittingTech, setIsSubmittingTech] = useState(false);
  const [imageFileTech, setImageFileTech] = useState<File | null>(null);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(null);

//************************************************************************* */
const fetchProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("ERROR FETCH:", error);
  } else {
    setProjects(data);
  }
};

/******************************************************************************* */
//const fetchTechnologies 
const fetchTechnologies = async () => {
  const { data, error } = await supabase
    .from("technologies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("ERROR FETCH:", error);
  } else {
    setTechnologies(data);
  }
};







/*********************************************************************************** */

useEffect(() => {
  const init = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/admin/login");
      return;
    }

    await fetchProjects();
    await fetchTechnologies();
  };

  init();
}, []);


/**
 * Dentro del submit ahora tenés:

✔ valida que exista archivo
✔ sube archivo a Storage
✔ obtiene URL pública
✔ guarda esa URL en la DB

 Esto es el flujo real de cualquier app moderna

 COSAS IMPORTANTES (no te olvides)
1. Bucket creado

En Supabase:

nombre: projects
público: 
 *
 * 
 */




  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //************************************************************** */
  //************* handleChange para technologies ********************

  const handleChangeTech = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setFormDataTech((prev) => ({
    ...prev,
    [name]: value,
  }));
};



/**************************************************************** */
/**************************************************************** */
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // 1. Validar imagen
    if (!imageFile) {
      alert("Subí una imagen");
      setIsSubmitting(false);
      return;
    }

    // 2. Generar nombre único
    const fileName = `${Date.now()}-${imageFile.name}`;

    // 3. Subir imagen a Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.log(uploadError);
      alert("Error al subir imagen");
      setIsSubmitting(false);
      return;
    }

    // 4. Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;
if (editingProject) {
  // UPDATE

const updatedFields: Partial<Project> = {
    title: formData.title,
    description: formData.description,
    github_url: formData.github_url,
    demo_url: formData.demo_url,
  };

  //  Solo si hay nueva imagen
  if (imageFile) {
    const fileName = `${Date.now()}-${imageFile.name}`;
 const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert("Error subiendo nueva imagen");
      return;
    }

    const { data } = supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

    updatedFields.image_url = data.publicUrl;
    updatedFields.image_path = fileName;
  }

 const { error } = await supabase
    .from("projects")
    .update(updatedFields)
    .eq("id", editingProject.id);

  if (error) {
    alert("Error al actualizar");
  } else {
    alert("Proyecto actualizado");
    setEditingProject(null);
    setFormData(initialFormData);
    setImageFile(null);
    await fetchProjects();
  }

  return;

 

} else {
  // CREATE
  const { error: insertError } = await supabase
    .from("projects")
    .insert([
      {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl,
        image_path: fileName,
        github_url: formData.github_url,
        demo_url: formData.demo_url,
      },
    ]);

  if (insertError) {
    console.log(insertError);
    alert("Error al guardar proyecto");
  } else {
    alert("Proyecto creado 🚀");
    setFormData(initialFormData);
    setImageFile(null);
    await fetchProjects();
  }
}

  } catch (err) {
    console.log(err);
    alert("Error inesperado");
  }

  setIsSubmitting(false);
};
  const handleLogout = async () => {
  await supabase.auth.signOut();
  //window.location.href = "/admin/login";
  router.push("/admin/login");
  
};




/************************************************************************************* */
/****************** handleSubmit para technologies *********************************** */
//************************************************************************************ */
const handleSubmitTechnology = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmittingTech(true);

  try {
    // UPDATE
    if (editingTechnology) {
      const updatedFields: Partial<Technology> = {
        name: formDataTech.name,
        type: formDataTech.type,
      };

      // nueva imagen opcional
      if (imageFileTech) {
        const fileName = `${Date.now()}-${imageFileTech.name}`;

        const { error: uploadError } = await supabase.storage
          .from("technologies")
          .upload(fileName, imageFileTech);

        if (uploadError) {
          alert("Error subiendo nueva imagen");
          return;
        }

        const { data } = supabase.storage
          .from("technologies")
          .getPublicUrl(fileName);

        updatedFields.image_url = data.publicUrl;
        updatedFields.image_path = fileName;
      }

      const { error } = await supabase
        .from("technologies")
        .update(updatedFields)
        .eq("id", editingTechnology.id);

      if (error) {
        alert("Error actualizando tecnología");
      } else {
        alert("Tecnología actualizada");

        setEditingTechnology(null);
        setFormDataTech(initial2FormData);
        setImageFileTech(null);

        await fetchTechnologies();
      }

      return;
    }

    // CREATE
    if (!imageFileTech) {
      alert("Subí una imagen");
      return;
    }

    const fileName = `${Date.now()}-${imageFileTech.name}`;

    const { error: uploadError } = await supabase.storage
  .from("technologies")
  .upload(fileName, imageFileTech, {
    upsert: true,
  });

    if (uploadError) {
      alert("Error subiendo imagen");
      return;
    }

    const { data } = supabase.storage
      .from("technologies")
      .getPublicUrl(fileName);

    const { error } = await supabase.from("technologies").insert([
      {
        name: formDataTech.name,
        image_url: data.publicUrl,
        image_path: fileName,
        type: formDataTech.type,
      },
    ]);

    if (error) {
      alert("Error guardando tecnología");
    } else {
      alert("Tecnología creada");

      setFormDataTech(initial2FormData);
      setImageFileTech(null);

      await fetchTechnologies();
    }
  } catch (error) {
    console.log(error);
    alert("Error inesperado");
  }finally {
    setIsSubmittingTech(false);
  }
};

/************************************************************************************** */
/************************************************************************************** */
/************************************************************************************** */
//funcionalidad para eliminar un proyecto publicado en el sitio
const handleDelete = async (project: Project) => {
  const confirmDelete = confirm("¿Eliminar proyecto?");
  if (!confirmDelete) return;

  // 1. borrar imagen del storage
  const { error: storageError } = await supabase.storage
    .from("projects")
    .remove([project.image_path]);

  if (storageError) {
    console.log("Error borrando imagen:", storageError);
  }

  // 2. borrar de la DB
  const { error: dbError } = await supabase
    .from("projects")
    .delete()
    .eq("id", project.id);

  if (dbError) {
    console.log("Error borrando proyecto:", dbError);
    alert("Error al eliminar");
  } else {
    alert("Proyecto eliminado");
    await fetchProjects();
  }
};

/****************************************************************************************************************** */
/****************************************************************************************************************** */
//********************* handle para eliminar technologies ********************************************************* */
const handleDeleteTechnology = async (tech: Technology) => {
  const confirmDelete = confirm("¿Eliminar tecnología?");
  if (!confirmDelete) return;

  await supabase.storage
    .from("technologies")
    .remove([tech.image_path]);

  const { error } = await supabase
    .from("technologies")
    .delete()
    .eq("id", tech.id);

  if (error) {
    alert("Error eliminando");
  } else {
    alert("Tecnología eliminada");
    await fetchTechnologies();
  }
};






/****************************************************************************************************************** */
//funcionalidad de actualizacion de proyectos cargados al sitio 

const handleEdit = (project: Project) => {
  setEditingProject(project);
  setFormData({
    title: project.title,
    description: project.description,
    image_url: project.image_url,
    github_url: project.github_url,
    demo_url: project.demo_url,
  });
};

/******************************************************************************************************************* */
//********************************** handle update para technologies ********************************************** */
//**************************************************************************************************************** */

const handleEditTechnology = (tech: Technology) => {
  setEditingTechnology(tech);

  setFormDataTech({
    name: tech.name,
    image_url: tech.image_url,
    image_path: tech.image_path,
    type: tech.type,
  });
};






//***************************************************************************************************************** */
/**
 *   <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View Site
            </Link>
 */

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
        
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Create Project Card */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Create New Project
                </h2>
                <p className="text-sm text-muted-foreground">
                  Add a new project to your portfolio
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <Type className="w-4 h-4 text-muted-foreground" />
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="My Awesome Project"
                  className="w-full bg-muted border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project..."
                  rows={4}
                  className="w-full bg-muted border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label
                  htmlFor="image_url"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  Image URL
                </label>
             <input
  type="file"
  accept="image/*"
  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
/>

              </div>

              {/* URLs Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* GitHub URL */}
                <div className="space-y-2">
                  <label
                    htmlFor="github_url"
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    GitHub URL
                  </label>
                  <input
                    id="github_url"
                    name="github_url"
                    type="url"
                    value={formData.github_url}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full bg-muted border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                {/* Demo URL */}
                <div className="space-y-2">
                  <label
                    htmlFor="demo_url"
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    Demo URL
                  </label>
                  <input
                    id="demo_url"
                    name="demo_url"
                    type="url"
                    value={formData.demo_url}
                    onChange={handleChange}
                    placeholder="https://myproject.vercel.app"
                    className="w-full bg-muted border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Project
                  </>
                )}
              </motion.button>
            </form>
          </div>


          
        </motion.div>

<div className="bg-card border border-border rounded-lg p-6 mt-10">
  <h2 className="text-lg font-semibold mb-4">
  {editingTechnology ? "Update Technology" : "Create Technology"}
</h2>

  <form onSubmit={handleSubmitTechnology} className="space-y-4">
    <input
      type="text"
      name="name"
      placeholder="React"
      value={formDataTech.name}
      onChange={handleChangeTech}
      className="w-full border rounded p-3"
      required
    />

    <select
      name="type"
      value={formDataTech.type}
      onChange={handleChangeTech}
      className="w-full border rounded p-3"
      required
    >
      <option value="">Seleccionar categoría</option>
      <option value="frontend">Frontend</option>
      <option value="backend">Backend</option>
      <option value="database">Database</option>
      <option value="tools">Tools</option>
    </select>

   <input
  type="file"
  accept="image/*"
  onChange={(e) => setImageFileTech(e.target.files?.[0] || null)}
  required={!editingTechnology}
/>

    {imageFileTech && (
      <p className="text-sm text-green-500">
        {imageFileTech.name}
      </p>
    )}

    <button
      type="submit"
      disabled={isSubmittingTech}
      className="w-full bg-primary text-white p-3 rounded"
    >
      {isSubmittingTech
  ? "Guardando..."
  : editingTechnology
  ? "Actualizar tecnología"
  : "Crear tecnología"}
    </button>

    {editingTechnology && (
  <button
    type="button"
    onClick={() => {
      setEditingTechnology(null);
      setFormDataTech(initial2FormData);
      setImageFileTech(null);
    }}
    className="w-full border p-3 rounded mt-2"
  >
    Cancelar edición
  </button>
)}
  </form>
</div>




<div className="mt-10">
  <h2 className="text-lg font-semibold mb-4">Proyectos creados</h2>

  <div className="grid md:grid-cols-2 gap-4">
    {projects.map((project) => (
      <div
        key={project.id}
        className="border rounded-lg p-4 bg-card"
      >
        <img
          src={project.image_url}
          className="w-full h-40 object-cover rounded mb-3"
        />

        <h3 className="font-bold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="flex gap-2 mt-3">
        <button onClick={() => handleDelete(project)}>
  Eliminar
</button>
         <button onClick={() => handleEdit(project)}>
  Editar
</button>
        </div>
      </div>
    ))}
  </div>
</div>





<div className="mt-10">
  <h2 className="text-lg font-semibold mb-4">
    Technologies creadas
  </h2>

<div className="grid md:grid-cols-3 gap-4">
  {technologies.map((tech) => (
    <div key={tech.id} className="border rounded p-4 bg-card">
      <img
        src={tech.image_url}
        className="w-full h-24 object-cover rounded"
      />

      <h3 className="font-semibold mt-2">{tech.name}</h3>
      <p className="text-sm text-muted-foreground">{tech.type}</p>

      <button
        onClick={() => handleDeleteTechnology(tech)}
        className="mt-3 px-3 py-2 rounded bg-red-500 text-white text-sm"
      >
        Eliminar
      </button>
      <button
  onClick={() => handleEditTechnology(tech)}
  className="mt-2 px-3 py-2 rounded bg-blue-500 text-white text-sm"
>
  Editar
</button>
    </div>
  ))}
</div>
</div>


      </main>
    </div>
  );







}

