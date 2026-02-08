import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    DocumentSnapshot,
    Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export interface Recipe {
    id?: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    cookTime: number;
    prepTime: number;
    servings: number;
    category: string;
    cuisine: string;
    difficulty: 'easy' | 'medium' | 'hard';
    imageUrl?: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    rating: number;
    ratingCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const RECIPES_COLLECTION = 'recipes';

// Get all recipes with pagination
export async function getRecipes(
    pageSize: number = 10,
    lastDoc?: DocumentSnapshot
): Promise<{ recipes: Recipe[]; lastDoc: DocumentSnapshot | null }> {
    let q = query(
        collection(db, RECIPES_COLLECTION),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
    );

    if (lastDoc) {
        q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const recipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate(),
    })) as Recipe[];

    const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

    return { recipes, lastDoc: newLastDoc };
}

// Get a single recipe by ID
export async function getRecipeById(id: string): Promise<Recipe | null> {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: (docSnap.data().createdAt as Timestamp)?.toDate(),
        updatedAt: (docSnap.data().updatedAt as Timestamp)?.toDate(),
    } as Recipe;
}

// Get recipes by category
export async function getRecipesByCategory(
    category: string,
    pageSize: number = 10
): Promise<Recipe[]> {
    const q = query(
        collection(db, RECIPES_COLLECTION),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate(),
    })) as Recipe[];
}

// Get recipes by author
export async function getRecipesByAuthor(authorId: string): Promise<Recipe[]> {
    const q = query(
        collection(db, RECIPES_COLLECTION),
        where('authorId', '==', authorId),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate(),
    })) as Recipe[];
}

// Search recipes by title
export async function searchRecipes(searchTerm: string): Promise<Recipe[]> {
    // Firestore doesn't support full-text search, so we use a simple prefix match
    const q = query(
        collection(db, RECIPES_COLLECTION),
        where('title', '>=', searchTerm),
        where('title', '<=', searchTerm + '\uf8ff'),
        limit(20)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate(),
    })) as Recipe[];
}

// Create a new recipe
export async function createRecipe(
    recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(db, RECIPES_COLLECTION), {
        ...recipe,
        createdAt: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now),
    });
    return docRef.id;
}

// Update a recipe
export async function updateRecipe(
    id: string,
    updates: Partial<Omit<Recipe, 'id' | 'createdAt'>>
): Promise<void> {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date()),
    });
}

// Delete a recipe
export async function deleteRecipe(id: string): Promise<void> {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    await deleteDoc(docRef);
}

// Upload recipe image
export async function uploadRecipeImage(
    file: File,
    recipeId: string
): Promise<string> {
    const storageRef = ref(storage, `recipes/${recipeId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}

// Get top rated recipes
export async function getTopRatedRecipes(count: number = 10): Promise<Recipe[]> {
    const q = query(
        collection(db, RECIPES_COLLECTION),
        orderBy('rating', 'desc'),
        limit(count)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate(),
    })) as Recipe[];
}
