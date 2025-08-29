import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { CheckCircle, Award, Star, X, Trophy } from 'lucide-react';

function BadgeModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[3, 3, 3]} />;
}

function BadgeModal({ badge, isOpen, onClose, userProgress, onEarnBadge, onUpdateProgress }) {
  if (!badge) return null;

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-500';
      case 'Rare': return 'bg-blue-500';
      case 'Epic': return 'bg-purple-500';
      case 'Legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'Legendary': return <Star className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  // Handle earning a badge
  const handleEarnBadge = () => {
    onEarnBadge(badge.id);
  };

  // Handle updating progress
  const handleUpdateProgress = (newProgress) => {
    onUpdateProgress(badge.id, newProgress);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {badge.name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* 3D Model Section */}
          <div className="space-y-4">
            <div className="h-80 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
              <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />
                <Suspense fallback={null}>
                  <BadgeModel modelPath={badge.model} />
                  <OrbitControls 
                    enableZoom={true} 
                    enablePan={true}
                    autoRotate
                    autoRotateSpeed={1}
                  />
                </Suspense>
              </Canvas>
            </div>
            
            {/* Progress Section */}
            <div className="space-y-3">
              {userProgress && !userProgress.earned && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Progress
                    </span>
                    <span>{userProgress.progress}%</span>
                  </div>
                  <Progress value={userProgress.progress} className="h-3" />
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleUpdateProgress(Math.min(100, userProgress.progress + 10))}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      +10%
                    </Button>
                    <Button 
                      onClick={handleEarnBadge}
                      className="flex-1"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Earn Badge
                    </Button>
                  </div>
                </div>
              )}
              
              {userProgress && userProgress.earned && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Badge Earned!</span>
                  <span className="text-sm text-green-600">
                    {new Date(userProgress.earnedDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <Badge className={`${getRarityColor(badge.rarity)} text-white flex items-center gap-2 px-3 py-1`}>
                  {getRarityIcon(badge.rarity)}
                  {badge.rarity}
                </Badge>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Points Value</p>
                  <p className="text-2xl font-bold text-primary">{badge.points}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {badge.category}
              </Badge>
              <p className="text-gray-700 leading-relaxed">
                {badge.longDescription}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Earning Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {badge.criteria.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Malaysian Educational Values</h4>
              <p className="text-sm text-blue-800">
                This badge aligns with Malaysia's commitment to holistic education and character development, 
                fostering values that contribute to national identity and global citizenship.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


